"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Button, Spinner } from "@heroui/react";
import { Trash2, Eye, EyeOff, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { TProduct } from "@/types/product";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchAdminProducts = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/admin/products`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      toast.error("Failed to load global catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProducts();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setUpdatingId(id);
    const newStatus =
      currentStatus === "Available" ? "Unpublished" : "Available";

    try {
      const res = await fetch(`${SERVER_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setProducts(
          products.map((p) => {
            const pId = p.id || (p as any)._id;
            return pId === id ? { ...p, status: newStatus as any } : p;
          }),
        );
        toast.success(`Product is now ${newStatus.toLowerCase()}.`);
      } else {
        toast.error("Failed to update product status.");
      }
    } catch {
      toast.error("Error communicating with server.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this product?"))
      return;
    setUpdatingId(id);
    try {
      const res = await fetch(`${SERVER_URL}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setProducts(
          products.filter((p) => {
            const pId = p.id || (p as any)._id;
            return pId !== id;
          }),
        );
        toast.success("Product deleted successfully.");
      } else {
        toast.error("Failed to delete product.");
      }
    } catch {
      toast.error("Error communicating with server.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading product catalog..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Ecosystem Directory
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
          Catalog Management
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Oversee platform-wide inventory, review product categories, and manage
          listed items.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-default-50 border border-dashed rounded-2xl">
          <p className="text-muted-foreground text-sm font-medium">
            No products found in the platform database.
          </p>
        </div>
      ) : (
        <div className="bg-default-50 border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-muted-foreground font-semibold">
              <thead>
                <tr className="border-b text-default-500 font-bold bg-default-100">
                  <th className="py-5 px-6">Product Details</th>
                  <th className="py-5 px-6">Author / Seller</th>
                  <th className="py-5 px-6">Category</th>
                  <th className="py-5 px-6">Price</th>
                  <th className="py-5 px-6">Status</th>
                  <th className="py-5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default-100">
                {products.map((p) => {
                  const pId = p.id || (p as any)._id;
                  const isAvailable = p.status === "Available";

                  return (
                    <tr
                      key={pId}
                      className="hover:bg-default-100 transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-foreground">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-default-200 border shrink-0">
                            {p.image && (
                              <img
                                src={p.image}
                                className="absolute inset-0 w-full h-full object-cover"
                                alt="Cover"
                              />
                            )}
                          </div>
                          <span className="truncate max-w-xs">{p.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-default-600">
                        {p.sellerName || "Independent Seller"}
                      </td>
                      <td className="py-4 px-6 text-default-600">
                        {p.category}
                      </td>
                      <td className="py-4 px-6 font-black text-primary text-sm">
                        ${parseFloat(p.price.toString()).toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                            p.status === "Available"
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              : p.status === "Sold"
                                ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}
                        >
                          {p.status || "Available"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-medium">
                        <div className="flex items-center justify-end gap-3">
                          {p.status !== "Sold" && (
                            <button
                              disabled={updatingId === pId}
                              onClick={() =>
                                handleToggleStatus(pId, p.status || "Available")
                              }
                              className="text-default-500 hover:text-primary transition cursor-pointer"
                            >
                              {isAvailable ? (
                                <span className="flex items-center gap-1">
                                  <EyeOff className="w-4 h-4" /> Unpublish
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" /> Publish
                                </span>
                              )}
                            </button>
                          )}
                          <button
                            disabled={updatingId === pId}
                            onClick={() => handleDelete(pId)}
                            className="text-danger hover:text-danger/80 transition pl-3 border-l cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
