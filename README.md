Here is the clean, comment-free code for your `README.md` file. You can copy this block and write it directly to your frontend project's `README.md` or keep it in both directories.

```markdown
# NextMart Marketplace

NextMart is a full-stack, multi-vendor e-commerce platform built with Next.js 16 on the frontend and Express on the backend. The system integrates secure user registration, admin moderation tools, seller (reporter) workspaces, and Stripe checkout systems.

## Tech Stack

*   **Frontend:** Next.js 16, React 19, Tailwind CSS, HeroUI, Lucide React
*   **Backend:** Node.js, Express, MongoDB (Native Driver), Stripe SDK, JWT, Cookie Parser
*   **Authentication:** Better Auth with MongoDB Database Adapter and Google OAuth

---

## Key Modules

### 1. Secure Authentication
Managed via Better Auth. Supports standard email/password registration and Google OAuth sign-in. Session management leverages secure cookies handled on same-origin endpoints.

### 2. Multi-Vendor Workspaces
*   **Admin Core:** Access to ecosystem analytics, category charts, user management (banning, unbanning, deleting accounts), and manual role assignment.
*   **Seller Console:** Registration portal (lifetime verification fee via Stripe), new product publication with ImgBB asset upload, inventory monitoring, and sales ledger.
*   **Customer Dashboard:** Private profile customization (name and avatar update), static order histories, and bookmark/wishlist collections.

### 3. Product Catalog
Search and dynamic category filtering (Electronics, Fashion, Accessories, Home & Living) with real-time pricing boundaries. Detailed product views with instant Stripe checkout integration.

---

## Configuration

### Frontend Local Variables
Create a file named `.env` in your frontend directory:

```env
NEXT_PUBLIC_SERVER_URL=/server
BACKEND_INTERNAL_URL=http://localhost:5000
MONGODB_URI=mongodb_connection_uri
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=stripe_publishable_key
NEXT_PUBLIC_IMAGE_UPLOAD_API=imgbb_api_key
GOOGLE_CLIENT_ID=google_client_id
GOOGLE_CLIENT_SECRET=google_client_secret
BETTER_AUTH_SECRET=better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
JWT_SECRET=jwt_secret
```

### Backend Local Variables
Create a file named `.env` in your backend directory:

```env
PORT=5000
MONGO_URI=mongodb_connection_uri
CLIENT_URL=http://localhost:3000
STRIPE_SECRET_KEY=stripe_secret_key
```

---

## Local Setup

### Running Backend
In your Express backend project folder:

```bash
npm install
npm run dev
```

The Express API server will start on port `5000`.

### Running Frontend
In your Next.js frontend project folder:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` inside your browser to access the website.
```