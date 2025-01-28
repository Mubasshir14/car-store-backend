# Backend Starter Template

## Description

This repository serves as a starter template for backend projects using Node.js, TypeScript, Express, and MongoDB. It includes basic configurations for linting, formatting, and development tools to streamline your development process.

## Features

-**TypeScript** for strong typing and enhanced developer experience.

-**Express.js** for creating the server and APIs.

-**MongoDB** for database management using Mongoose.

-**Environment Variable** management with `dotenv`.

-**Linting and Formatting** with ESLint and Prettier.

-Development server with ts-node-dev for live reload.

-Modular architecture for scalability.

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
├── src
│   ├── app
│   ├    ├── config
│   └── server.ts
│   └── app.ts
├── dist                # Compiled JavaScript files
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project metadata and scripts
```

## Dependencies

### Production:

- `cors`: Enable Cross-Origin Resource Sharing
- `dotenv`: Load environment variables from `.env` file
- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool

```bash
  npm install cors dotenv express mongoose
```

### Development:

- `typescript`: TypeScript compiler
- `eslint`: Linting tool for JavaScript/TypeScript
- `prettier`: Code formatter
- `ts-node-dev`: Development server for TypeScript

```bash
  npm install --save-dev typescript eslint prettier ts-node-dev
```

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository.**
2. **Create a new branch** for your feature or bugfix.
3. **Commit your changes** with descriptive messages.
4. **Push your changes** and open a pull request.

---
