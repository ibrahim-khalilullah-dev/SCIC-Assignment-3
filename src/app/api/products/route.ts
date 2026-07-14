import { mongoConnect } from "@/lib/mongoConnect";
import { TProduct } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

// GET all products
export async function GET() {
  try {
    const { db } = await mongoConnect();

    const products = await db.collection("products").find().toArray();

    const formattedProducts = products.map((product) => ({
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      category: product.category,
      image: product.image,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      featured: product.featured,
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST new product
export async function POST(req: NextRequest) {
  try {
    const { db } = await mongoConnect();

    const data: TProduct = await req.json();

    // Basic validation
    if (!data.title || !data.category || !data.price || !data.image) {
      return NextResponse.json(
        {
          error: "Title, category, price, and image are required.",
        },
        { status: 400 },
      );
    }

    const result = await db.collection("products").insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Product created successfully.",
        id: result.insertedId,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 },
    );
  }
}
