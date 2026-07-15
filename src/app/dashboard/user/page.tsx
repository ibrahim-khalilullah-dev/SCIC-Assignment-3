"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardBody, Button, Spinner } from "@heroui/react";
import { ShoppingBag, Bookmark, CreditCard } from "lucide-react";
import Link from "next/link";
import { TProduct } from "@/types/product";

interface TTransaction {
  _id: string;
  transactionId: string;
  productTitle?: string;
  createdAt: string;
  amount: number;
}

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function UserDashboard() {
  const { user } = useAuth();
  const [purchasedProducts, setPurchasedProducts] = useState<TProduct[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<TTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [pRes, bRes, txRes] = await Promise.all([
          fetch(`${SERVER_URL}/api/user/purchased-products`, {
            credentials: "include",
          }),
          fetch(`${SERVER_URL}/api/bookmarks`, { credentials: "include" }),
          fetch(`${SERVER_URL}/api/user/purchases`, { credentials: "include" }),
        ]);

        if (pRes.ok) setPurchasedProducts(await pRes.json());
        if (bRes.ok) setBookmarks(await bRes.json());
        if (txRes.ok) setPurchases(await txRes.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading dashboard..." />
      </div>
    );
  }

  const totalInvestment = purchases.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-10">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Customer Workspace
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
          Welcome back, {user?.name}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Access your bought catalog list, wishlist collections, and monitor
          your system payments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-none shadow-md bg-default-50 p-5 rounded-2xl flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">
              Products Purchased
            </span>
            <span className="text-2xl font-black text-foreground">
              {purchasedProducts.length} Items
            </span>
          </div>
        </Card>

        <Card className="border-none shadow-md bg-default-50 p-5 rounded-2xl flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">
              Wishlisted Products
            </span>
            <span className="text-2xl font-black text-foreground">
              {bookmarks.length} Items
            </span>
          </div>
        </Card>

        <Card className="border-none shadow-md bg-default-50 p-5 rounded-2xl flex flex-row items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">
              Total Investment
            </span>
            <span className="text-2xl font-black text-foreground">
              ${totalInvestment.toFixed(2)}
            </span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-lg font-bold text-foreground">
              Your Purchased Products
            </h2>
            <Link
              href="/products"
              className="text-xs text-primary hover:underline font-bold"
            >
              Browse Catalog
            </Link>
          </div>

          {purchasedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {purchasedProducts.slice(0, 4).map((product) => (
                <Card
                  key={product.id}
                  className="border-none bg-default-50 p-4 rounded-2xl flex flex-row gap-4 items-center hover:scale-[1.01] transition-transform duration-200 shadow-sm"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden relative bg-default-100 shrink-0 flex items-center justify-center border">
                    {product.image ? (
                      <img
                        src={product.image}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Product Cover"
                      />
                    ) : (
                      <ShoppingBag className="w-6 h-6 text-default-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-foreground truncate">
                      {product.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      Seller: {product.sellerName}
                    </p>
                    <Link href={`/products/${product.id}`}>
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        radius="sm"
                        className="h-7 px-3 text-[10px] font-bold mt-3"
                      >
                        View Product
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-default-50 border border-dashed rounded-2xl">
              <p className="text-muted-foreground text-sm font-medium">
                No purchases recorded yet.
              </p>
            </div>
          )}
        </div>

        <div className="bg-default-50 p-6 rounded-3xl space-y-6 h-fit shadow-sm">
          <h2 className="text-base font-bold text-foreground">
            Customer Account Profile
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border bg-default-100 flex items-center justify-center shrink-0">
              {user?.image ? (
                <img
                  src={user.image}
                  className="w-full h-full object-cover"
                  alt="Avatar"
                />
              ) : (
                <span className="text-sm font-bold text-primary">
                  {user?.name ? user.name[0].toUpperCase() : "C"}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-sm font-bold text-foreground block truncate">
                {user?.name}
              </span>
              <span className="text-xs text-muted-foreground block truncate">
                {user?.email}
              </span>
            </div>
          </div>
          <div className="pt-4 border-t text-xs text-muted-foreground space-y-2 font-semibold">
            <div className="flex justify-between">
              <span>Account Type</span>
              <span className="text-foreground capitalize">{user?.role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground pb-3 border-b">
          Recent Purchase Transactions
        </h2>
        {purchases.length > 0 ? (
          <div className="bg-default-50 border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs text-muted-foreground">
                <thead>
                  <tr className="border-b text-default-500 font-bold bg-default-100">
                    <th className="py-4 px-6">Transaction ID</th>
                    <th className="py-4 px-6">Product Details</th>
                    <th className="py-4 px-6">Date Purchased</th>
                    <th className="py-4 px-6 text-right">Paid Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-default-100">
                  {purchases.map((tx) => (
                    <tr
                      key={tx._id}
                      className="hover:bg-default-100 transition-colors"
                    >
                      <td className="py-4 px-6 font-mono text-default-400">
                        <span
                          className="truncate max-w-[150px] block"
                          title={tx.transactionId}
                        >
                          {tx.transactionId}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-foreground">
                        {tx.productTitle || "Standard Goods"}
                      </td>
                      <td className="py-4 px-6">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right font-black text-primary text-sm">
                        ${parseFloat(tx.amount.toString()).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-default-50 border border-dashed rounded-2xl">
            <p className="text-muted-foreground text-sm font-medium">
              No transactions recorded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
