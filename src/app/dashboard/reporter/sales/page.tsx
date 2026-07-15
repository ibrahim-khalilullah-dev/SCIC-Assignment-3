"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody, Button, Spinner } from "@heroui/react";
import { CreditCard, ArrowLeft, DollarSign, Calendar } from "lucide-react";
import toast from "react-hot-toast";

interface TSale {
  _id: string;
  transactionId: string;
  buyerEmail: string;
  amount: number;
  createdAt: string;
}

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function ReporterSalesPage() {
  const router = useRouter();
  const [sales, setSales] = useState<TSale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSales() {
      try {
        const res = await fetch(`${SERVER_URL}/api/reporter/sales`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setSales(data);
        }
      } catch {
        toast.error("Failed to load your sales statements.");
      } finally {
        setLoading(false);
      }
    }
    fetchSales();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading sales ledger..." />
      </div>
    );
  }

  const totalEarnings = sales.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Financial Statements
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
            Sales History
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Audit your historical incoming marketplace payments and product
            revenue statements.
          </p>
        </div>

        <Card className="bg-default-50 border-none px-6 py-4 rounded-2xl shadow-sm flex flex-row items-center gap-4 shrink-0 min-w-[200px]">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
              Gross Revenue
            </span>
            <span className="text-xl font-black text-foreground">
              ${totalEarnings.toFixed(2)}
            </span>
          </div>
        </Card>
      </div>

      {sales.length > 0 ? (
        <div className="bg-default-50 border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs text-muted-foreground">
              <thead>
                <tr className="border-b text-default-500 font-bold bg-default-100">
                  <th className="py-5 px-6">Transaction ID</th>
                  <th className="py-5 px-6">Buyer Email</th>
                  <th className="py-5 px-6 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-default-400" />{" "}
                    Transaction Date
                  </th>
                  <th className="py-5 px-6 text-right flex-row items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-default-400 inline-block mr-1.5" />{" "}
                    Amount Received
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-default-100">
                {sales.map((log) => (
                  <tr
                    key={log._id}
                    className="hover:bg-default-100 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-default-400">
                      {log.transactionId}
                    </td>
                    <td className="py-4 px-6 font-semibold text-foreground">
                      {log.buyerEmail}
                    </td>
                    <td className="py-4 px-6">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right font-black text-primary text-sm">
                      ${parseFloat(log.amount.toString()).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-default-50 border border-dashed rounded-2xl">
          <p className="text-muted-foreground text-sm font-medium">
            No sales transactions have been recorded in your ledger yet.
          </p>
        </div>
      )}
    </div>
  );
}
p[;'\/'