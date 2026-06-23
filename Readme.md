# E-Commerce Backend API

A modular Node.js + Express backend for an e-commerce application, built with
layered architecture (controllers, services, repositories, DI container,
validation middlewares).

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Technology Stack](#technology-stack)
- [API Routes](#api-routes)
- [Authentication Flow](#authentication-flow)

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js**
- **npm**
- **MongoDB** (local instance or MongoDB Atlas connection)

## Project Setup

### 1. Clone the Repository (if applicable)

```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the root directory of your backend project:

```bash
cp .env.example .env  # copies .env.example file to your root folder
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```js
PORT=app_port
MONGODB_URI=your_mongo_uri
JWT_SECRET_KEY=your_jwt_secret_key

# Email Configuration (Nodemailer)
SMTP_HOST=your_host
SMTP_PORT=your_port
SMTP_ADMIN_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password_here
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer
- **Validation:** Custom middleware with validation schemas
- **Error Handling:** Custom AsyncHandler and ErrorHandler
- **Architecture:** MVC with Service/Repository patterns

## API Routes

### Legend

- 🟢 **PUBLIC** - No authentication required
- 🔵 **AUTHENTICATED** - User must be logged in
- 🔴 **ADMIN** - Admin privileges required

### Authentication Routes

| Method | Endpoint                | Access           | Description                      |
| ------ | ----------------------- | ---------------- | -------------------------------- |
| POST   | `/auth/register`        | 🟢 PUBLIC        | Register a new user              |
| POST   | `/auth/login`           | 🟢 PUBLIC        | Login user and get JWT token     |
| POST   | `/auth/logout`          | 🔵 AUTHENTICATED | Logout user                      |
| POST   | `/auth/forgot-password` | 🟢 PUBLIC        | Request password reset OTP       |
| POST   | `/auth/verify-otp`      | 🟢 PUBLIC        | Verify OTP for password reset    |
| POST   | `/auth/reset-password`  | 🟢 PUBLIC        | Reset password with verified OTP |

### Product Routes

| Method | Endpoint        | Access    | Description                                  |
| ------ | --------------- | --------- | -------------------------------------------- |
| GET    | `/products`     | 🟢 PUBLIC | Get all products (with filtering/pagination) |
| POST   | `/products`     | 🔴 ADMIN  | Create a new product                         |
| GET    | `/products/:id` | 🟢 PUBLIC | Get a single product by ID                   |
| PUT    | `/products/:id` | 🔴 ADMIN  | Update a product by ID                       |
| DELETE | `/products/:id` | 🔴 ADMIN  | Delete a product by ID                       |

## Authentication Flow

1. **Register** → User creates account + instantly logged in via jwt
2. **Login** → User receives JWT token
3. **Include Token** → Add token to protected routes
4. **Token Validation** → Middleware validates token on protected routes
5. **Logout** → clears token cookie

## API Responses

The API uses standardized responses:

```json
{
  "success": true || false,
  "message": message,
  "payload": {} // Optional
}
```
---
