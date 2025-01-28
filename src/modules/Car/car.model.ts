import { model, Schema } from 'mongoose';
import { TCar, TCarModel } from './car.interface';

const carSchema = new Schema<TCar>(
  {
    brand: {
      type: String,
      required: [true, 'Brand Name is required'],
      minlength: [4, 'Brand Name must contain at least 4 characters'],
      maxlength: [30, 'Brand Name cannot contain more than 30 characters'],
    },
    carName: {
      type: String,
      required: [true, 'Car Name is required'],
      minlength: [4, 'Car Name must contain at least 4 characters'],
      maxlength: [30, 'Car Name cannot contain more than 30 characters'],
    },
    image: {
      type: String,
    },
    model: {
      type: String,
      required: [true, 'Model Name is required'],
      minlength: [4, 'Model Name must contain at least 4 characters'],
      maxlength: [30, 'Model Name cannot contain more than 30 characters'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      validate: {
        validator: (value: number) => {
          const currentYear = new Date().getFullYear();
          return value <= currentYear;
        },
        message:
          '{VALUE} is not a valid year. It cannot be greater than the current year.',
      },
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [1, 'Price cannot be negative or zero'],
    },
    category: {
      type: String,
      enum: {
        values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
        message:
          "{VALUE} is not correct. Choose from these 'Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'",
      },
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [20, 'Description must contain at least 20 characters'],
      maxlength: [1000, 'Description cannot contain more than 1000 characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
    },
    milage: {
      type: String,
    },
    fuelType: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

carSchema.set('toJSON', {
  transform: (doc, obj) => {
    return {
      _id: obj._id,
      brand: obj.brand,
      carName: obj.carName,
      model: obj.model,
      image: obj.image,
      year: obj.year,
      price: obj.price,
      category: obj.category,
      milage: obj.milage,
      fuelType: obj.fuelType,
      description: obj.description,
      quantity: obj.quantity,
      inStock: obj.inStock,
    };
  },
});

carSchema.statics.isCarExists = async function (id: string) {
  const car = await Car.findById(id);
  return car;
};

export const Car = model<TCar, TCarModel>('Car', carSchema);
