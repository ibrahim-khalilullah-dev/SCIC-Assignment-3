"use client";

import { useEffect, useState } from "react";
import { Card, Button, Spinner } from "@heroui/react";
import { Bookmark, ShoppingCart, Trash2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import toast from "react-hot-toast";

interface TBookmark {
  _id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  productPrice: number;
  productCategory: string;
  productSeller: string;
}

export default function UserBookmarksPage() {
  const [bookmarks, setBookmarks] = useState<TBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchBookmarks = async () => {
    try {
      const res = await apiFetch("/api/bookmarks");
      if (res.ok) {
        const data = await res.json();
        setBookmarks(data);
      }
    } catch {
      toast.error("Failed to load wishlist items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleRemove = async (productId: string) => {
    try {
      const res = await apiFetch("/api/bookmarks/" + productId, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookmarks(bookmarks.filter((b) => b.productId !== productId));
        toast.success("Item removed from wishlist.");
      } else {
        toast.error("Failed to remove item.");
      }
    } catch {
      toast.error("Error connecting to server.");
    }
  };

  const handleBuyNow = async (productId: string) => {
    setLoadingId(productId);
    try {
      const res = await apiFetch("/api/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ type: "purchase", productId }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Failed to initiate checkout session.");
      }
    } catch {
      toast.error("Error reaching payment gateway.");
    } finally {
      setLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading wishlist..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Saved Items
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
          Wishlist Shelf
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Your curated selection of catalog products saved to buy or explore
          later.
        </p>
      </div>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((b) => (
            <Card
              key={b._id}
              className="bg-default-50 border-none p-5 rounded-2xl flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200 shadow-sm"
            >
              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden relative bg-default-100 flex items-center justify-center">
                  {b.productImage ? (
                    <img
                      src={b.productImage}
                      alt={b.productTitle}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Bookmark className="w-8 h-8 text-default-400" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                    {b.productCategory}
                  </span>
                  <h3 className="font-bold text-foreground text-md truncate mt-1">
                    {b.productTitle}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Seller: {b.productSeller}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground uppercase font-bold">
                    Price
                  </span>
                  <span className="text-md font-black text-primary">
                    ${parseFloat(b.productPrice.toString()).toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2 w-full">
                  <Button
                    onClick={() => handleRemove(b.productId)}
                    variant="flat"
                    color="danger"
                    radius="sm"
                    size="sm"
                    className="flex-1 font-bold"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </Button>
                  <Button
                    onClick={() => handleBuyNow(b.productId)}
                    color="primary"
                    radius="sm"
                    size="sm"
                    isLoading={loadingId === b.productId}
                    disabled={loadingId !== null}
                    className="flex-1 font-bold"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" /> Buy Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-default-50 border-none rounded-2xl shadow-sm">
          <p className="text-muted-foreground text-sm font-medium">
            Your wishlist shelf is currently empty.
          </p>
        </div>
      )}
    </div>
  );
}
