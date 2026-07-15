"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShoppingCart,
  Star,
  ArrowLeft,
  Bookmark,
  Check,
  PackageCheck,
  ShieldAlert,
} from "lucide-react";
import { Button, Spinner } from "@heroui/react";
import { useAuth } from "@/hooks/useAuth";
import { TProduct } from "@/types/product";
import toast from "react-hot-toast";

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
  const { user } = useAuth();

  const [product, setProduct] = useState<TProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function loadProductAndWishlist() {
      try {
        const pRes = await fetch(`${SERVER_URL}/api/products/${id}`);
        if (!pRes.ok) throw new Error("Not found");
        const pData = await pRes.json();
        setProduct(pData);

        if (user) {
          const bRes = await fetch(`${SERVER_URL}/api/bookmarks`, {
            credentials: "include",
          });
          if (bRes.ok) {
            const bData = await bRes.json();
            const alreadySaved = bData.some((b: any) => b.productId === id);
            setIsBookmarked(alreadySaved);
          }
        }
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    loadProductAndWishlist();
  }, [id, user]);

  const handleBookmarkToggle = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!product || !product.id) return;

    setActionLoading(true);
    try {
      if (isBookmarked) {
        const res = await fetch(`${SERVER_URL}/api/bookmarks/${product.id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (res.ok) {
          setIsBookmarked(false);
          toast.success("Removed from wishlist.");
        }
      } else {
        const res = await fetch(`${SERVER_URL}/api/bookmarks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ productId: product.id }),
        });
        if (res.ok) {
          setIsBookmarked(true);
          toast.success("Added to wishlist.");
        } else {
          const data = await res.json();
          toast.error(data.message || "Failed to wishlist product.");
        }
      }
    } catch {
      toast.error("Error communicating with server.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!product || !product.id) return;

    setActionLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/api/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ type: "purchase", productId: product.id }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Failed to initiate checkout.");
      }
    } catch {
      toast.error("Error connecting to payment gateway.");
    } finally {
      setActionLoading(false);
    }
  };

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

  const isSeller = user && user.id === product.sellerId;
  const isAdmin = user && user.role === "admin";
  const isSoldOut = product.status === "Sold" || product.stock <= 0;

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
              <span
                className={`text-sm font-semibold flex items-center gap-1 ${isSoldOut ? "text-danger" : "text-emerald-500"}`}
              >
                <PackageCheck className="size-4" />{" "}
                {isSoldOut ? "Out of Stock" : "In Stock"}
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
              disabled={actionLoading || isAdmin}
              onClick={handleBookmarkToggle}
              variant="bordered"
              radius="sm"
              size="lg"
              className={`font-semibold border-default-300 ${
                isBookmarked
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "text-foreground"
              }`}
            >
              <Bookmark className="size-5" />
              {isBookmarked ? "Wishlisted" : "Save to Wishlist"}
            </Button>

            {isAdmin ? (
              <Button
                disabled
                size="lg"
                color="secondary"
                radius="sm"
                className="w-full font-bold text-md border border-secondary/20 cursor-not-allowed"
                startContent={<ShieldAlert className="size-5" />}
              >
                Admin Control Active
              </Button>
            ) : isSeller ? (
              <Button
                disabled
                size="lg"
                variant="bordered"
                radius="sm"
                className="w-full font-semibold text-md cursor-not-allowed"
              >
                Cannot buy your own product
              </Button>
            ) : isSoldOut ? (
              <Button
                disabled
                size="lg"
                variant="bordered"
                radius="sm"
                className="w-full font-semibold text-md cursor-not-allowed text-danger border-danger/30"
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={handleBuyNow}
                isLoading={actionLoading}
                size="lg"
                color="primary"
                radius="sm"
                className="w-full font-bold text-md shadow-lg shadow-primary/20"
                startContent={<ShoppingCart className="size-5" />}
              >
                Purchase Product Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
