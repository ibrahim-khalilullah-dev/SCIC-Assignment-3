"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, Button, Spinner } from "@heroui/react";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { TProduct } from "@/types/product";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function PurchasedProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPurchased() {
      try {
        const res = await fetch(SERVER_URL + "/api/user/purchased-products", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch {
        toast.error("Failed to load your purchased collection.");
      } finally {
        setLoading(false);
      }
    }
    fetchPurchased();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
          label="Opening personal collection..."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="light"
        color="default"
        radius="sm"
        onClick={() => router.push("/dashboard/user")}
        className="font-semibold text-default-600 hover:text-primary w-fit"
        startContent={<ArrowLeft className="size-4" />}
      >
        Back to Dashboard
      </Button>

      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Personal Collection
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
          Purchased Products
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Your fully unlocked private collection of standard premium purchases.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((book) => {
            const pId = book.id || (book as any)._id;
            return (
              <Card
                key={pId}
                className="bg-default-50 border-none p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200 shadow-sm"
              >
                <div className="space-y-4">
                  <div className="aspect-square rounded-xl overflow-hidden relative bg-default-100 flex items-center justify-center">
                    {book.image ? (
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ShoppingBag className="w-8 h-8 text-default-400" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                      {book.category}
                    </span>
                    <h3 className="font-bold text-foreground text-md truncate mt-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Seller: {book.sellerName || "Verified Vendor"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 flex items-center justify-between gap-3">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold uppercase tracking-wider">
                    Unlocked
                  </span>
                  <Link href={"/products/" + pId}>
                    <Button
                      color="primary"
                      radius="sm"
                      size="sm"
                      className="font-bold shadow-md shadow-primary/10"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-default-50 border-none rounded-2xl shadow-sm">
          <p className="text-muted-foreground text-sm font-medium">
            No products purchased yet. Explore our marketplace catalog to make
            your first purchase.
          </p>
        </div>
      )}
    </div>
  );
}
