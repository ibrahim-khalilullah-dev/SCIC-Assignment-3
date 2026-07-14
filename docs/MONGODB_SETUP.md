# MongoDB Setup Guide

This guide explains how to connect a Next.js application to MongoDB using the official MongoDB Node.js Driver.

---

## 1. Install MongoDB Driver

```bash
npm install mongodb
```

---

## 2. Create Environment Variables

Create a `.env.local` file in the project root.

```env
MONGODB_URI=your_mongodb_connection_string
DATABASE_NAME=your_database_name
```

### Local MongoDB Example

```env
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=nextmart
```

### MongoDB Atlas Example

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=nextmart
```

---

## 3. Create the MongoDB Connection

Create the following file:

```
src/
└── lib/
    └── mongoConnect.ts
```

Example responsibilities of this file:

- Create a MongoDB client
- Connect to the database
- Export the database instance
- Reuse the connection during development

---

## 4. Connection Pattern

The connection utility should:

- Read `MONGODB_URI`
- Read `DATABASE_NAME`
- Connect using `MongoClient`
- Return:
  - `client`
  - `db`

Example usage:

```ts
const { db } = await mongoConnect();
```

---

## 5. Collections

Example collections:

```
users
products
orders
categories
reviews
```

---

## 6. Using the Database

```ts
const { db } = await mongoConnect();

const products = await db.collection("products").find().toArray();
```

---

## 7. CRUD Operations

### Read

```ts
db.collection("products").find().toArray();
```

### Read One

```ts
db.collection("products").findOne({
  _id: new ObjectId(id),
});
```

### Create

```ts
db.collection("products").insertOne(data);
```

### Update

```ts
db.collection("products").updateOne(
  { _id: new ObjectId(id) },
  {
    $set: data,
  },
);
```

### Delete

```ts
db.collection("products").deleteOne({
  _id: new ObjectId(id),
});
```

---

## Best Practices

- Store secrets inside `.env.local`.
- Never commit `.env.local` to Git.
- Reuse the MongoDB connection.
- Use MongoDB ObjectId for document identifiers.
- Validate request data before database operations.
- Handle errors with appropriate HTTP status codes.
