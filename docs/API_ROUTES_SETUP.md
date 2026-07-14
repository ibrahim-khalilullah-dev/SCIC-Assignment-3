# Next.js API Routes Setup Guide

This guide explains how the project is structured using Next.js App Router API Routes.

---

# Folder Structure

```
src/
└── app/
    └── api/
        ├── login/
        │   └── route.ts
        │
        ├── logout/
        │   └── route.ts
        │
        ├── me/
        │   └── route.ts
        │
        └── products/
            ├── route.ts
            └── [id]/
                └── route.ts
```

---

# Route Naming

Every API endpoint contains a `route.ts` file.

Example:

```
app/api/products/route.ts
```

becomes

```
GET /api/products
POST /api/products
```

---

```
app/api/products/[id]/route.ts
```

becomes

```
GET /api/products/:id
PUT /api/products/:id
DELETE /api/products/:id
```

---

# HTTP Methods

## GET

Retrieve resources.

```ts
export async function GET() {}
```

---

## POST

Create resources.

```ts
export async function POST(req: NextRequest) {}
```

---

## PUT

Update resources.

```ts
export async function PUT(req: NextRequest, context) {}
```

---

## DELETE

Delete resources.

```ts
export async function DELETE(req: NextRequest, context) {}
```

---

# Dynamic Routes

Dynamic folders use square brackets.

```
[id]
```

Example URL:

```
/api/products/684c0ab...
```

Access the parameter:

```ts
const { id } = await context.params;
```

---

# Returning Responses

Always use `NextResponse`.

```ts
return NextResponse.json(data);
```

Example:

```ts
return NextResponse.json(
  {
    message: "Success",
  },
  {
    status: 200,
  },
);
```

---

# Reading Request Body

```ts
const body = await req.json();
```

---

# Error Handling

Wrap database operations inside a `try/catch`.

```ts
try {
  // logic
} catch (error) {
  return NextResponse.json(
    {
      error: "Something went wrong",
    },
    {
      status: 500,
    },
  );
}
```

---

# Authentication Routes

Example authentication endpoints:

```
POST /api/login
POST /api/logout
GET /api/me
```

Responsibilities:

- Login
- Logout
- Return authenticated user
- JWT verification
- Cookie management

---

# Resource Routes

Example product endpoints:

```
GET    /api/products
GET    /api/products/:id

POST   /api/products

PUT    /api/products/:id

DELETE /api/products/:id
```

---

# Recommended API Structure

```
app/
└── api/
    ├── auth/
    ├── products/
    ├── users/
    ├── orders/
    ├── categories/
    └── reviews/
```

---

# Best Practices

- Keep routes focused on HTTP request handling.
- Separate database logic into reusable service functions when the project grows.
- Validate request payloads.
- Return meaningful HTTP status codes.
- Protect sensitive routes with authentication.
- Use middleware for route protection.
- Keep response formats consistent across the application.
