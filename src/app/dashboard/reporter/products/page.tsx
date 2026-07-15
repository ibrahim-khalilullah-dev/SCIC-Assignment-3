"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardBody, Button, Spinner } from "@heroui/react";
import {
  Trash2,
  Edit3,
  PlusCircle,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";
import { TProduct } from "@/types/product";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function ReporterProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const fetchReporterProducts = async () => {
    try {
      const res = await fetch(SERVER_URL + "/api/reporter/products", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch {
      toast.error("Failed to load your catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReporterProducts();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setLoadingId(id);
    const newStatus =
      currentStatus === "Available" ? "Unpublished" : "Available";

    try {
      const res = await fetch(SERVER_URL + "/api/products/" + id, {
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
        toast.success("Product is now " + newStatus.toLowerCase() + ".");
      } else {
        toast.error("Failed to update visibility.");
      }
    } catch {
      toast.error("Error communicating with server.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this product?"))
      return;

    setLoadingId(id);
    try {
      const res = await fetch(SERVER_URL + "/api/products/" + id, {
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
      setLoadingId(null);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button
          variant="light"
          color="default"
          radius="sm"
          onClick={() => router.push("/dashboard/reporter")}
          className="font-semibold text-default-600 hover:text-primary w-fit"
          startContent={<ArrowLeft className="size-4" />}
        >
          Back to Cockpit
        </Button>

        <Link href="/dashboard/reporter/new">
          <Button
            color="primary"
            radius="sm"
            className="font-bold shadow-lg shadow-primary/20 w-fit"
            startContent={<PlusCircle className="w-4 h-4" />}
          >
            Publish New Product
          </Button>
        </Link>
      </div>

      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Catalog Administration
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
          Manage Products
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Publish, unpublish, modify, or permanently remove your marketplace
          product listings.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 bg-default-50 rounded-2xl shadow-sm">
          <p className="text-muted-foreground text-sm font-medium">
            No products found in your catalog. Click Publish New Product to
            begin.
          </p>
        </div>
      ) : (
        <div className="bg-default-50 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-muted-foreground">
              <thead>
                <tr className="text-default-500 font-bold bg-default-100">
                  <th className="py-5 px-6">Product Details</th>
                  <th className="py-5 px-6">Category</th>
                  <th className="py-5 px-6">Price</th>
                  <th className="py-5 px-6">Status</th>
                  <th className="py-5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default-100/50">
                {products.map((product) => {
                  const pId = product.id || (product as any)._id;

                  return (
                    <tr
                      key={pId}
                      className="hover:bg-default-100 transition-colors"
                    >
                      <td className="py-4 px-6 font-bold text-foreground">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-default-200 border-none shrink-0">
                            {product.image && (
                              <img
                                src={product.image}
                                className="absolute inset-0 w-full h-full object-cover"
                                alt="Cover"
                              />
                            )}
                          </div>
                          <span className="truncate max-w-xs">
                            {product.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-default-500">
                        {product.category}
                      </td>
                      <td className="py-4 px-6 font-black text-primary text-sm">
                        ${parseFloat(product.price.toString()).toFixed(2)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border-none uppercase tracking-wider ${
                            product.status === "Available"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : product.status === "Sold"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {product.status || "Available"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right font-medium">
                        <div className="flex items-center justify-end gap-4">
                          <Link
                            href={"/dashboard/reporter/edit/" + pId}
                            className="text-default-500 hover:text-primary transition font-bold"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          {product.status !== "Sold" && (
                            <button
                              disabled={loadingId === pId}
                              onClick={() =>
                                handleToggleStatus(
                                  pId,
                                  product.status || "Available",
                                )
                              }
                              className="text-default-500 hover:text-primary transition cursor-pointer"
                            >
                              {product.status === "Available" ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          )}
                          <button
                            disabled={loadingId === pId}
                            onClick={() => handleDelete(pId)}
                            className="text-danger hover:text-danger/80 transition cursor-pointer"
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
