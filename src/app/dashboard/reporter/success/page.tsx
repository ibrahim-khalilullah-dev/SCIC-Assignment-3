"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardBody, Button, Spinner } from "@heroui/react";
import { CheckCircle2, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

function ReporterSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
      return;
    }

    async function verifyReporterPayment() {
      try {
        const res = await fetch(
          `${SERVER_URL}/api/verify-payment?session_id=${sessionId}`,
          {
            credentials: "include",
          },
        );

        if (res.ok) {
          toast.success("Vendor account successfully activated!");
        } else {
          toast.error("Failed to apply verified status locally.");
        }
      } catch {
        toast.error("Connection error while activating license.");
      } finally {
        setVerifying(false);
      }
    }

    verifyReporterPayment();
  }, [sessionId, router]);

  if (verifying) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
          label="Processing activation ledger..."
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[80vh] flex flex-col justify-center items-center px-6">
      <Card className="max-w-md w-full bg-default-50 border-none p-8 rounded-3xl shadow-xl text-center">
        <CardBody className="p-0 space-y-6">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_24px_rgba(16,185,129,0.1)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-foreground">
              Verification Complete!
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Congratulations! Your lifetime seller activation payment is
              processed. You are now recognized as an active platform merchant.
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <Link href="/dashboard/reporter" className="block w-full">
              <Button
                color="primary"
                radius="sm"
                className="w-full h-12 font-bold shadow-lg shadow-primary/20"
              >
                Go to Seller Console
              </Button>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-default-500 hover:text-default-800 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Homepage
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default function ReporterSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <Spinner
            size="lg"
            color="primary"
            label="Loading success details..."
          />
        </div>
      }
    >
      <ReporterSuccessContent />
    </Suspense>
  );
}
