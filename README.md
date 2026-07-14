# 🛍️ NextMart

A modern, beginner-friendly e-commerce application built with **Next.js 15**, **TypeScript**, **MongoDB**, and **Next.js API Routes**. This project demonstrates how to build a full-stack application using the App Router, secure authentication, protected routes, and CRUD operations while following a clean and scalable architecture.

---

## 🚀 Features

- ⚡ Next.js 15 App Router
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🧩 shadcn/ui Components
- 🗄️ MongoDB (Native Driver)
- 🔌 Next.js API Routes
- 🔐 JWT Authentication
- 🍪 HTTP-only Cookie Authentication
- 🛡️ Protected Routes using Middleware
- 📦 Product CRUD API
- 🛒 Product Listing
- 📄 Product Details
- ➕ Create Product (Protected)
- ✏️ Manage Products (Protected)
- 📱 Fully Responsive Design
- 📂 Clean Folder Structure

---

## 🛠️ Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

### Backend

- Next.js API Routes
- MongoDB Native Driver
- JWT
- bcryptjs

---

## 📁 Project Structure

```text
src
│
├── app
│   ├── api
│   │   ├── login
│   │   ├── logout
│   │   ├── me
│   │   └── products
│   │       └── [id]
│   │
│   ├── products
│   │   ├── create
│   │   ├── manage
│   │   └── [id]
│   │
│   ├── login
│   ├── signup
│   └── about
│
├── components
│
├── providers
│   └── AuthProvider.tsx
│
├── hooks
│   └── useAuth.ts
│
├── lib
│   └── mongoConnect.ts
│
├── types
│
└── middleware.ts
```

---

## 🔐 Authentication

Authentication is implemented using:

- JWT
- HTTP-only Cookies
- bcrypt Password Hashing
- Protected Routes with Next.js Middleware

Authentication flow:

```text
User Login
      │
      ▼
API Route (/api/login)
      │
      ▼
Verify Credentials
      │
      ▼
Generate JWT
      │
      ▼
Store HTTP-only Cookie
      │
      ▼
Protected Pages & APIs
```

---

## 📦 Product APIs

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/products`     | Get all products   |
| GET    | `/api/products/:id` | Get single product |
| POST   | `/api/products`     | Create product     |
| PUT    | `/api/products/:id` | Update product     |
| DELETE | `/api/products/:id` | Delete product     |

---

## 🔒 Protected Routes

The following routes require authentication:

- `/products/create`
- `/products/manage`

Protection is handled using **Next.js Middleware**.

---

## ⚙️ Environment Variables

Create a `.env.local` file.

```env
MONGODB_URI=your_mongodb_connection_string
DATABASE_NAME=nextmart
JWT_SECRET=your_secret_key
```

---

## 📥 Installation

Clone the repository.

```bash
git clone <repository-url>
```

Navigate to the project.

```bash
cd nextmart
```

Install dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📚 Learning Objectives

This project helps you learn:

- Next.js App Router
- TypeScript Fundamentals
- MongoDB CRUD Operations
- RESTful API Development
- Authentication with JWT
- HTTP-only Cookie Sessions
- Next.js Middleware
- Protected Routes
- React Context API
- Custom Hooks
- Server and Client Components
- Folder Organization
- Clean Architecture

---

## 📈 Future Improvements

- Product Search
- Category Filtering
- Shopping Cart
- Wishlist
- Checkout Flow
- Order Management
- User Dashboard
- Admin Dashboard
- Image Upload
- Pagination
- Product Reviews
- Payment Gateway Integration
- Email Verification
- Password Reset

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

## 📄 License

This project is intended for educational purposes and is open for learning, modification, and experimentation.
