import { SignupForm } from "@/components/forms/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-16 bg-background relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-black text-2xl tracking-wider text-primary"
          >
            NextMart
          </Link>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
