"use client";

import { useEffect, useState } from "react";
import { Card, Spinner } from "@heroui/react";
import { Users, ShoppingBag, Star, CreditCard, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";

interface TAnalytics {
  totalUsers: number;
  totalWriters: number;
  totalEbooks: number;
  totalSold: number;
  totalRevenue: number;
  genreAnalytics: { _id: string; count: number }[];
  monthlySales: { _id: string; totalSales: number }[];
}

interface TTransaction {
  _id: string;
  transactionId: string;
  type: string;
  buyerEmail: string;
  amount: number;
  createdAt: string;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<TAnalytics | null>(null);
  const [transactions, setTransactions] = useState<TTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const [aRes, tRes] = await Promise.all([
          apiFetch("/api/admin/analytics"),
          apiFetch("/api/admin/transactions"),
        ]);

        if (aRes.ok) setAnalytics(await aRes.json());
        if (tRes.ok) setTransactions(await tRes.json());
      } catch {
        toast.error("Failed to load platform analytics.");
      } finally {
        setLoading(false);
      }
    }
    fetchAdminData();
  }, []);

  if (loading || !analytics) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
          label="Loading analytics console..."
        />
      </div>
    );
  }

  const metrics = [
    {
      title: "Registered Users",
      value: `${analytics.totalUsers} Accounts`,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Products Published",
      value: `${analytics.totalEbooks} Items`,
      icon: ShoppingBag,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Verified Sellers",
      value: `${analytics.totalWriters} Vendors`,
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Gross Revenue",
      value: `$${analytics.totalRevenue.toFixed(2)}`,
      icon: CreditCard,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  const salesData = analytics.monthlySales || [];
  const maxSale =
    salesData.length > 0
      ? Math.max(...salesData.map((s) => s.totalSales))
      : 100;

  let pathD = "M 20,130 L 480,130";
  let fillD = "M 20,130 L 480,130 L 480,130 L 20,130 Z";
  const circles: { x: number; y: number }[] = [];

  if (salesData.length > 1) {
    const points = salesData.map((s, idx) => {
      const x = 20 + idx * (460 / (salesData.length - 1));
      const val = s.totalSales;
      const pct = val / (maxSale || 1);
      const y = 130 - pct * 110;
      return { x, y };
    });

    pathD =
      `M ${points[0].x},${points[0].y} ` +
      points
        .slice(1)
        .map((p) => `L ${p.x},${p.y}`)
        .join(" ");
    fillD =
      `M ${points[0].x},140 ` +
      points.map((p) => `L ${p.x},${p.y}`).join(" ") +
      ` L ${points[points.length - 1].x},140 Z`;
    points.forEach((p) => circles.push({ x: p.x, y: p.y }));
  } else if (salesData.length === 1) {
    pathD = "M 20,75 L 480,75";
    fillD = "M 20,75 L 480,75 L 480,140 L 20,140 Z";
    circles.push({ x: 250, y: 75 });
  }

  const recentTx = transactions.slice(0, 5);

  return (
    <div className="space-y-10">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Executive Workspace
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
          System Administration
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Monitor system users, approve vendor licenses, and audit gross
          platform transactions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="bg-default-50 border-none p-5 rounded-2xl flex flex-row items-center gap-5 shadow-sm"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.bg} ${item.color} shrink-0 border-none`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-muted-foreground uppercase tracking-wider block font-bold">
                  {item.title}
                </span>
                <span className="text-xl font-black text-foreground mt-1 block">
                  {item.value}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-default-50 border-none p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-foreground">
              Monthly Sales Volume Trend
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Trace transaction scale for the previous calendar cycles.
            </p>
          </div>

          <div className="w-full h-48 bg-default-100 rounded-2xl flex items-end justify-center px-4 relative overflow-hidden border-none">
            <svg
              viewBox="0 0 500 150"
              className="w-full h-full text-primary overflow-visible relative z-10"
            >
              <defs>
                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-primary)"
                    stopOpacity="0.2"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-primary)"
                    stopOpacity="0.0"
                  />
                </linearGradient>
              </defs>
              <g stroke="currentColor" strokeOpacity="0.05" strokeWidth="1">
                <line x1="20" y1="30" x2="480" y2="30" />
                <line x1="20" y1="65" x2="480" y2="65" />
                <line x1="20" y1="100" x2="480" y2="100" />
              </g>
              <path d={fillD} fill="url(#chartGlow)" stroke="none" />
              <path
                d={pathD}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {circles.map((c, i) => (
                <g key={i}>
                  <circle cx={c.x} cy={c.y} r="8" className="fill-primary/20" />
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r="4"
                    className="fill-primary stroke-default-50 stroke-2"
                  />
                </g>
              ))}
            </svg>
          </div>
          <div className="flex justify-between text-[10px] text-default-400 font-bold uppercase tracking-wider px-2">
            {salesData.length > 0 ? (
              salesData.map((s) => <span key={s._id}>{s._id}</span>)
            ) : (
              <>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </>
            )}
          </div>
        </Card>

        <Card className="bg-default-50 border-none p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-foreground">
              Products by Category
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Volume ratios distributed across active catalog filters.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {analytics.genreAnalytics && analytics.genreAnalytics.length > 0 ? (
              analytics.genreAnalytics.map((g) => {
                const total = analytics.totalEbooks || 1;
                const percentage = Math.round((g.count / total) * 100);

                return (
                  <div key={g._id} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-default-700">
                        {g._id || "Uncategorized"}
                      </span>
                      <span className="text-muted-foreground">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-default-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-muted-foreground">
                No category data found.
              </p>
            )}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground pb-3">
          Recent Platform Transactions
        </h2>
        {recentTx.length > 0 ? (
          <div className="bg-default-50/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border-none">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs text-muted-foreground font-semibold">
                <thead>
                  <tr className="text-default-500 font-bold bg-default-100">
                    <th className="py-4 px-6">Transaction ID</th>
                    <th className="py-4 px-6">Ecosystem Type</th>
                    <th className="py-4 px-6">Buyer Email</th>
                    <th className="py-4 px-6 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-default-400" />{" "}
                      Purchase Date
                    </th>
                    <th className="py-4 px-6 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-default-100">
                  {recentTx.map((tx) => (
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
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${
                            tx.type === "purchase"
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                              : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-foreground">
                        {tx.buyerEmail}
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
          <div className="text-center py-10 bg-default-50 border-none rounded-2xl shadow-sm">
            <p className="text-muted-foreground text-sm font-medium">
              No transactions recorded yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
