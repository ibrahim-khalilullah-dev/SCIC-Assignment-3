import { mongoConnect } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Get Product by ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const { db } = await mongoConnect();

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formattedProduct = {
      id: product._id.toString(),
      title: product.title,
      description: product.description,
      image: product.image,
      category: product.category,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      featured: product.featured,
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

// Update Product
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const body = await req.json();

    const { db } = await mongoConnect();

    const result = await db.collection("products").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: body,
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

// Delete Product
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const { db } = await mongoConnect();

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
