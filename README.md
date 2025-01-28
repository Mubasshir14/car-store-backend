# Car Store Backend

Check out our [Live Link](https://car-store-backend-red.vercel.app) 


## Description

A professional and highly efficient backend system designed for seamless management of a Car Store. Built with Express and TypeScript, this application is seamlessly integrated with MongoDB via Mongoose, ensuring robust data management and consistency. With comprehensive schema validation and a well-structured framework, it delivers reliability, scalability, and performance for handling all Car Store operations effortlessly.

## Features

-**TypeScript** for strong typing and enhanced developer experience.

-**Express.js** for creating the server and APIs.

-**MongoDB** for database management using Mongoose.

-**Environment Variable** management with `dotenv`.

-**Linting and Formatting** with ESLint and Prettier.

-**ShurjoPay** for payment integration.

-Development server with ts-node-dev for live reload.

-Modular architecture for scalability.

## Authentication Overview
-  JWT-based authentication is used to secure user access. An access token is issued for short-term use to access protected resources, while a refresh token allows the user to obtain a new access token without re-login once it expires. The refresh token is securely stored and can be used to refresh the access token as needed.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (version 16 or above)
- **npm** or **yarn**
- **MongoDB instance** (local or cloud-based)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and configure your environment variables:
   ```env
   PORT=3000
   DATABASE_URL= your-mongodb-uri
   NODE_ENV=development
   BCRYPT_SALT_ROUND= Any Number
   JWT_ACCESS_SECRET=
   JWT_REFRESH_SECRET=
   JWT_ACCESS_EXPIRES_IN=10d
   JWT_REFRESH_EXPIRES_IN=365d
   RESET_PASSWORD_UI_LINK=http://localhost:5000
   IMAGEBB_API_KEY=
   SP_ENDPOINT=https://sandbox.shurjopayment.com
   SP_USERNAME=sp_sandbox
   SP_PASSWORD=
   SP_PREFIX=SP
   SP_RETURN_URL=http://localhost:5173/verification

   ```

## Scripts

- **Start Development Server:**

  ```bash
  npm run start:dev
  ```

- **Build for Production:**

  ```bash
  npm run build
  ```

- **Start Production Server:**

  ```bash
  npm run start:prod
  ```

- **Lint Code:**

  ```bash
  npm run lint
  ```

- **Fix Lint Issues:**

  ```bash
  npm run lint:fix
  ```

- **Format Code with Prettier:**

  ```bash
  npm run prettier
  ```

- **Fix Formatting Issues:**
  ```bash
  npm run prettier:fix
  ```

## Folder Structure

```
car-store-backend/
├── src/
│   ├── app/
│   │   ├── builder/
│   │   │   └── QueryBuilder.ts
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── errors/
│   │   │   ├── AppError.ts
│   │   │   ├── handleZodError.ts
│   │   │   └── handleCastError.ts
│   │   ├── interface/
│   │   │   ├── events.ts
│   │   │   └── index.d.ts
│   │   ├── middlewares/
│   │   │   ├── auth.ts
│   │   │   └── globalErrorHandler.ts
│   │   ├── route/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── CatchAsync.ts
│   │   │   └── sendResponse.ts
│   ├── module/
│   │   ├── Car/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Auth/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Cart/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Order/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── Review/
│   │   │   ├── controller.ts
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   ├── route.ts
│   │   │   ├── validation.ts
│   │   │   └── service.ts
│   │   ├── User/
│   │   │   ├── interface.ts
│   │   │   ├── model.ts
│   │   │   └── validation.ts
│   ├── app.ts
│   ├── server.ts
├── dist/                   # Compiled JavaScript files
├── .env                    # Environment variables
├── .eslintrc.config.mjs            # ESLint configuration
├── .prettierrc             # Prettier configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```


## Dependencies

### Production:

- `bcrypt`: Library for hashing passwords
- `cookie-parser`: Parse cookies for incoming requests
- `cors`: Enable Cross-Origin Resource Sharing
- `dotenv`: Load environment variables from `.env` file
- `express`: Web framework for building REST APIs
- `http-status`: Manage and use HTTP status codes
- `jsonwebtoken`: Generate and verify JSON Web Tokens (JWT)
- `lint-staged`: Run linters on staged Git files
- `mongoose`: MongoDB object modeling library
- `nodemailer`: Send emails from Node.js
- `shurjopay`: Payment gateway integration for ShurjoPay
- `zod`: Schema validation library for data

```bash
npm install bcrypt cookie-parser cors dotenv express http-status jsonwebtoken lint-staged mongoose nodemailer shurjopay zod
```

### Development:

- `typescript`: TypeScript compiler
- `eslint`: Linting tool for JavaScript/TypeScript
- `prettier`: Code formatter
- `ts-node-dev`: Development server for TypeScript

```bash
  npm install --save-dev @eslint/js @types/bcrypt @types/cookie-parser @types/cors @types/eslint__js @types/express @types/form-data @types/jsonwebtoken @types/node @types/nodemailer eslint globals prettier ts-node-dev typescript typescript-eslint
```

## API Endpoints
## CARS
-`Get api/car`

-`POST api/car`

-`PATCH api/car/:id`

-`DELETE api/car/:id`

-`GET api/car/:id`

## USER
-`POST(REGISTER) api/auth/register`

-`POST(LOG IN) api/auth/login`

-`POST(LOG OUT) api/auth/logout`

-`POST(CHANGE PASSWORD) api/auth/change-password`

-`GET(USER) api/auth/user`

-`GET(USER OWN) api/auth/me`


## CART
-`POST api/cart`

-`GET api/cart`

-`GET api/cart/:id`

-`DELETE api/cart/:id`

## ORDERS
-`POST api/order`

-`POST(VERIFY) api/order/verify`

-`GET api/order`

-`GET(USER ORDER OWN) api/order/my-order`

-`PATCH api/order/:id/status`

-`GET(REVENUE) api/oder/revenue`

## REVIEW
-`POST api/review`

-`GET api/review`

-`GET(PRODUCT BASED) api/review/:id`



## REGISTER
```bash
{
  "name": "Your Name",
  "email": "yourname@example.com",
  "password": "yourpassword",
  "phone": "+11111111111",
  "address": "123 Main Street",
  "city": "New York"
}
```

## ADD CAR
```bash
{
    "brand": "Honda 250",
    "carName": "Honda Civic 250",
    "image": "https://i.ibb.co.com/R7WwqxM/pexels-photo-116675.jpg",
    "model": "2024",
    "year": 2024,
    "price": 35000,
    "category": "Sedan",
    "description": "The Honda Civic 2022 is a compact sedan with a modern design. Known for its fuel efficiency, excellent handling, and advanced technology, the Civic is perfect for those who need a reliable and stylish vehicle. With its sleek looks and comfortable interior, the Civic is ideal for daily driving, offering great fuel economy of 32 MPG in the city and 42 MPG on the highway.",
    "quantity": 10,
    "milage": "32 MPG",
    "fuelType": "Petrol",
    "inStock": true
}
```

## CREATE ORDER
```bash
{
    "cars": [
        {
            "car": "6795c98c02786d93f1084842",
            "quantity": 1
        }
    ]
}
```


---
