"use client";

import Image from "next/image";
import { ShoppingCart, Star, ArrowLeft, PackageCheck } from "lucide-react";
import { Button, Spinner } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TProduct } from "@/types/product";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const getValidImageUrl = (src: string) => {
  if (!src)
    return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/")
  ) {
    return src;
  }
  return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";
};

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${SERVER_URL}/api/products/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
          label="Fetching product details..."
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-xl font-bold text-foreground">Product not found.</p>
        <Button
          color="primary"
          variant="flat"
          onClick={() => router.push("/products")}
        >
          Back to Catalog
        </Button>
      </div>
    );
  }

  return (
    <main className="container py-16 mx-auto px-6">
      <Button
        variant="light"
        color="default"
        radius="sm"
        onClick={() => router.push("/products")}
        className="mb-8 font-semibold text-default-600 hover:text-primary"
        startContent={<ArrowLeft className="size-4" />}
      >
        Back to Catalog
      </Button>

      <div className="grid gap-12 lg:grid-cols-2 items-start">
        <div className="relative aspect-square overflow-hidden rounded-2xl border bg-default-50 shadow-md">
          <Image
            src={getValidImageUrl(product.image)}
            alt={product.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full inline-block">
              {product.category}
            </span>

            <h1 className="text-4xl lg:text-5xl font-black text-foreground">
              {product.title}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="size-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-extrabold">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">|</span>
              <span className="text-sm text-emerald-500 font-semibold flex items-center gap-1">
                <PackageCheck className="size-4" /> In Stock
              </span>
            </div>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="border-t border-b py-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider block font-semibold">
                Price
              </span>
              <span className="text-4xl font-black text-foreground">
                ${product.price}
              </span>
            </div>

            <div className="space-y-1 text-right">
              <span className="text-xs text-muted-foreground uppercase tracking-wider block font-semibold">
                Availability
              </span>
              <span className="font-extrabold text-foreground text-lg">
                {product.stock} units left
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              size="lg"
              color="primary"
              radius="sm"
              className="w-full font-bold text-md shadow-lg shadow-primary/20"
              startContent={<ShoppingCart className="size-5" />}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
