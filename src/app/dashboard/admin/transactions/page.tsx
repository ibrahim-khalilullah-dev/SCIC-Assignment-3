"use client";

import { useEffect, useState } from "react";
import { Card, Spinner } from "@heroui/react";
import { CreditCard, Calendar, DollarSign } from "lucide-react";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";

interface TTransaction {
  _id: string;
  transactionId: string;
  type: string;
  buyerEmail: string;
  amount: number;
  createdAt: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<TTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await apiFetch("/api/admin/transactions");
        if (res.ok) {
          const data = await res.json();
          setTransactions(data);
        }
      } catch {
        toast.error("Failed to load transaction ledger.");
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
          label="Loading transaction sheets..."
        />
      </div>
    );
  }

  const totalRevenue = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Financial Records
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
            Ecosystem Transactions Log
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Audit real-time platform transactions, including customer checkouts
            and seller licensing fees.
          </p>
        </div>

        <Card className="bg-default-50 border-none px-6 py-4 rounded-2xl shadow-sm flex flex-row items-center gap-4 shrink-0 min-w-[200px]">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
              Accrued Revenue
            </span>
            <span className="text-xl font-black text-foreground">
              ${totalRevenue.toFixed(2)}
            </span>
          </div>
        </Card>
      </div>

      {transactions.length > 0 ? (
        <div className="bg-default-50/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm border-none">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-muted-foreground font-semibold">
              <thead>
                <tr className="text-default-500 font-bold bg-default-100">
                  <th className="py-5 px-6">Transaction ID</th>
                  <th className="py-5 px-6">Ecosystem Type</th>
                  <th className="py-5 px-6">Buyer Email</th>
                  <th className="py-5 px-6 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-default-400" />{" "}
                    Transaction Date
                  </th>
                  <th className="py-5 px-6 text-right flex-row items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-default-400 inline-block mr-1.5" />{" "}
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default-100">
                {transactions.map((tx) => (
                  <tr
                    key={tx._id}
                    className="hover:bg-default-100 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-default-400">
                      <span
                        className="truncate max-w-[180px] block"
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
        <div className="text-center py-16 bg-default-50 border-none rounded-2xl shadow-sm">
          <p className="text-muted-foreground text-sm font-medium">
            No transaction records found in the platform database.
          </p>
        </div>
      )}
    </div>
  );
}
