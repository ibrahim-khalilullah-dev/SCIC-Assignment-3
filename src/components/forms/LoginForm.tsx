"use client";

import { useState, FormEvent } from "react";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Invalid credentials.");
        return;
      }

      toast.success("Welcome back!");
      router.push("/");
    } catch {
      toast.error("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPass: string) => {
    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: demoEmail,
        password: demoPass,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Demo login failed.");
        return;
      }

      toast.success("Logged in successfully!");
      router.push("/");
    } catch {
      toast.error("Server connection error during demo authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Could not initiate Google authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border border-default-100 bg-background/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <CardBody className="p-0 space-y-6">
            <div className="text-center space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Welcome Back
              </h1>
              <p className="text-xs text-default-500">
                Sign in to access your dashboard
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-default-400 uppercase tracking-widest block text-center">
                Demo Accounts
              </span>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    handleDemoLogin("admin@nextmart.com", "admin123")
                  }
                  className="bg-secondary/10 hover:bg-secondary/20 text-secondary text-[11px] font-semibold rounded-lg h-9 border border-secondary/10"
                >
                  Admin
                </Button>
                <Button
                  size="sm"
                  onClick={() =>
                    handleDemoLogin("seller@nextmart.com", "seller123")
                  }
                  className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-[11px] font-semibold rounded-lg h-9 border border-amber-500/10"
                >
                  Seller
                </Button>
                <Button
                  size="sm"
                  onClick={() =>
                    handleDemoLogin("user@nextmart.com", "user123")
                  }
                  className="bg-default-100 hover:bg-default-200 text-foreground/80 text-[11px] font-semibold rounded-lg h-9 border border-default-200"
                >
                  Customer
                </Button>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="bordered"
              radius="sm"
              className="w-full h-10 text-sm font-semibold text-default-700 hover:bg-default-100 transition-colors border-default-200"
            >
              <svg
                className="mr-2 size-4"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative flex py-1 items-center w-full">
              <div className="flex-grow border-t border-default-200"></div>
              <span className="flex-shrink mx-4 text-[10px] text-default-400 uppercase tracking-widest font-semibold">
                Or Use Credentials
              </span>
              <div className="flex-grow border-t border-default-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                isRequired
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                labelPlacement="outside"
                value={email}
                onValueChange={setEmail}
                variant="bordered"
                radius="sm"
                classNames={{
                  inputWrapper:
                    "border-default-200 focus-within:border-primary h-10 bg-background",
                }}
                startContent={
                  <Mail className="size-4 text-default-400 flex-shrink-0" />
                }
              />

              <Input
                isRequired
                type={isVisible ? "text" : "password"}
                label="Password"
                placeholder="••••••••"
                labelPlacement="outside"
                value={password}
                onValueChange={setPassword}
                variant="bordered"
                radius="sm"
                classNames={{
                  inputWrapper:
                    "border-default-200 focus-within:border-primary h-10 bg-background",
                }}
                startContent={
                  <Lock className="size-4 text-default-400 flex-shrink-0" />
                }
                endContent={
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="focus:outline-none"
                  >
                    {isVisible ? (
                      <EyeOff className="size-4 text-default-400" />
                    ) : (
                      <Eye className="size-4 text-default-400" />
                    )}
                  </button>
                }
              />

              <Button
                type="submit"
                color="primary"
                variant="solid"
                radius="sm"
                isLoading={isLoading}
                className="w-full font-semibold h-11 text-sm mt-2 shadow-md shadow-primary/25 hover:opacity-95 transition-opacity"
              >
                Log In
              </Button>
            </form>

            <div className="text-center text-xs text-default-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline ml-1"
              >
                Sign Up Today
              </Link>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
