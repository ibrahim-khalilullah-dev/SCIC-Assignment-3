"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardBody, Button, Spinner } from "@heroui/react";
import {
  Sparkles,
  Package,
  DollarSign,
  BarChart2,
  PlusCircle,
  ArrowUpRight,
} from "lucide-react";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

interface TSale {
  _id: string;
  transactionId: string;
  amount: number;
}

export default function ReporterDashboard() {
  const { user } = useAuth();
  const [productsCount, setProductsCount] = useState(0);
  const [sales, setSales] = useState<TSale[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (user?.verifiedReporter) {
      async function fetchReporterData() {
        try {
          const [pRes, sRes] = await Promise.all([
            apiFetch("/api/reporter/products"),
            apiFetch("/api/reporter/sales"),
          ]);

          if (pRes.ok) {
            const productsData = await pRes.json();
            setProductsCount(productsData.length);
          }
          if (sRes.ok) {
            const salesData = await sRes.json();
            setSales(salesData);
          }
        } catch {
          toast.error("Failed to load seller statistics.");
        } finally {
          setLoading(false);
        }
      }
      fetchReporterData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleVerifyNow = async () => {
    setIsVerifying(true);
    try {
      const res = await apiFetch("/api/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({
          type: "publishing fee",
          price: "20.00",
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message || "Failed to launch payment portal.");
      }
    } catch {
      toast.error("Error reaching stripe payment servers.");
    } finally {
      setIsVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading vendor cockpit..." />
      </div>
    );
  }

  if (!user?.verifiedReporter) {
    return (
      <div className="max-w-2xl mx-auto my-12 space-y-6">
        <Card className="bg-default-50 border-none rounded-3xl p-8 shadow-md">
          <CardBody className="p-0 text-center space-y-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto border-none">
              <Sparkles size={24} className="text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground tracking-tight">
                Activate Product Publishing Privileges
              </h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                To list items for sale and collect revenues, complete a one-time
                marketplace vendor verification.
              </p>
            </div>

            <div className="bg-default-100 p-5 rounded-2xl max-w-sm mx-auto flex items-center justify-between text-left text-xs font-semibold border-none">
              <div>
                <span className="text-muted-foreground block uppercase font-bold text-[9px] tracking-wider">
                  Verification Fee
                </span>
                <span className="text-lg font-black text-foreground">
                  $20.00{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    / lifetime
                  </span>
                </span>
              </div>
              <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border-none">
                Lifetime Access
              </span>
            </div>

            <Button
              onClick={handleVerifyNow}
              isLoading={isVerifying}
              className="w-full max-w-sm h-12 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl text-xs transition duration-200 shadow-lg shadow-primary/20 border-none"
            >
              Verify Seller Account Now
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  const grossEarnings = sales.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Creator Workspace
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
            Seller Console
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Publish products to the marketplace, manage stock counts, and
            monitor gross revenues.
          </p>
        </div>
        <Link href="/dashboard/reporter/products">
          <Button
            color="primary"
            radius="sm"
            className="h-11 font-bold shadow-lg shadow-primary/20 border-none"
            startContent={<PlusCircle className="w-4 h-4" />}
          >
            Publish New Product
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-default-50 border-none p-5 rounded-2xl flex flex-row items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">
              Products Listed
            </span>
            <span className="text-2xl font-black text-foreground">
              {productsCount} Items
            </span>
          </div>
        </Card>

        <Card className="bg-default-50 border-none p-5 rounded-2xl flex flex-row items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">
              Total Sales Volume
            </span>
            <span className="text-2xl font-black text-foreground">
              {sales.length} Purchases
            </span>
          </div>
        </Card>

        <Card className="bg-default-50 border-none p-5 rounded-2xl flex flex-row items-center gap-4 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">
              Accrued Revenues
            </span>
            <span className="text-2xl font-black text-foreground">
              ${grossEarnings.toFixed(2)}
            </span>
          </div>
        </Card>
      </div>

      <div className="rounded-2xl p-8 bg-default-50/50 space-y-4 shadow-sm text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-6 border-none">
        <div className="space-y-1">
          <h3 className="font-bold text-lg text-foreground">
            Explore Vendor Portals
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Easily track your historical cash inflows or manage individual
            product listings inside separate directory pages.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            as={Link}
            href="/dashboard/reporter/products"
            variant="flat"
            radius="sm"
            className="font-bold border-none"
          >
            Manage Listings
          </Button>
          <Button
            as={Link}
            href="/dashboard/reporter/sales"
            color="primary"
            radius="sm"
            className="font-bold border-none"
            endContent={<ArrowUpRight className="w-4 h-4" />}
          >
            Sales Ledger
          </Button>
        </div>
      </div>
    </div>
  );
}
