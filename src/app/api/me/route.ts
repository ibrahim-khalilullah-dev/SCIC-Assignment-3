import { mongoConnect } from "@/lib/mongoConnect";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json(null);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const { db } = await mongoConnect();

    const user = await db.collection("users").findOne({
      _id: new ObjectId(decoded.id),
    });

    if (!user) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch {
    return NextResponse.json(null);
  }
}
