import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { User } from '../User/user.model';
import { orderUtils } from './order.utils';
import { Car } from '../Car/car.model';
import Order from './order.model';
import { TOrder } from './order.interface';

const createOrderIntoDB = async (
  email: string,
  payload: {
    cars: {
      car: string;
      quantity: number;
      name: string;
      brand: string;
      category: string;
      description: string;
      fuelType: string;
      image: string;
      milage: string;
      year: number;
      userName: string;
      email: string;
      price: number;
      address: string;
      phone: string;
      city: string;
      totalPrice: number;
    }[];
  },
  client_ip: string,
) => {
  if (!payload?.cars?.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Order is not specified');
  }
  const cars = payload?.cars;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  let totalPrice = 0;

  const carDetails = await Promise.all(
    cars.map(async (item) => {
      const car = await Car.findById(item.car);
      if (!car) {
        throw new AppError(httpStatus.NOT_FOUND, 'Car not found');
      }
      if (item.quantity > car.quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `${car.brand} ${car.model} is not available.`,
        );
      }
      car.quantity -= item.quantity;
      if (car.quantity === 0) {
        car.inStock = false;
      }
      await car.save();

      totalPrice += car.price * item.quantity;
      return {
        ...item, // Spread all the item details (e.g., name, brand, etc.)
        car: car._id, // Use the car's ObjectId
      };
    }),
  );

  let order = await Order.create({
    user: user._id,
    cars: carDetails, // Save full car details, not just the car ID
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: user?.address || 'unknown',
    customer_email: user.email,
    customer_phone: user?.phone || 'unknown',
    customer_city: user?.city || 'unknown',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    const bank_status = verifiedPayment[0].bank_status;

    const order = await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          bank_status == 'Success'
            ? 'Paid'
            : bank_status == 'Failed'
              ? 'Pending'
              : bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
    if (!order) {
      throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
    }

    if (bank_status === 'Cancel') {
      await Promise.all(
        order.cars.map(async (item) => {
          const car = await Car.findById(item.car);

          if (car) {
            car.quantity += item.quantity;
            car.inStock = car.quantity > 0;

            await car.save();
          }
        }),
      );
    }
  }

  return verifiedPayment;
};

const getOrderFromDB = async () => {
  const result = await Order.find();
  return result;
};

// get order for specific user by using user email
const getOrderFromDBFOrSpecificUser = async (email: string) => {
  const orders = await Order.find({ 'cars.email': email }).populate('user');
  console.log(orders);
  return orders;
};

const getSingleOrderFromDb = async (id: string, userEmail: string) => {
  const result = await Order.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not Found');
  }

  // Find user to get their MongoDB ID
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Compare user IDs
  if (result.user.toString() !== user._id.toString()) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to view this order',
    );
  }

  return result;
};
const getAdminSingleOrderFromDb = async (id: string) => {
  const result = await Order.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not Found');
  }

  return result;
};

const calculateTotalRevenue = async () => {
  const orders = await Order.find();
  if (!orders.length) {
    throw new Error('No Orders Exist');
  }
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  return totalRevenue;
};

const updateOrderStatus = async (
  id: string,
  orderStatus: string,
): Promise<TOrder | null> => {
  const allowedStatuses = ['Shipped', 'Cancelled'];
  if (!allowedStatuses.includes(orderStatus)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid order status');
  }
  const order = await Order.findById(id);
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }
  if (order.orderStatus === 'Shipped' || order.orderStatus === 'Cancelled') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Cannot modify order status once shipped or cancelled',
    );
  }
  const result = await Order.findByIdAndUpdate(
    id,
    { orderStatus },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const OrderService = {
  createOrderIntoDB,
  verifyPayment,
  getOrderFromDB,
  getOrderFromDBFOrSpecificUser,
  getSingleOrderFromDb,
  calculateTotalRevenue,
  getAdminSingleOrderFromDb,
  updateOrderStatus,
};
