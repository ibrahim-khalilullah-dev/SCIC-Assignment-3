"use client";

import { useState, useEffect } from "react";
import { Input, Button, Card, CardBody } from "@heroui/react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShieldAlert,
  UserCheck,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import Script from "next/script";

declare global {
  interface Window {
    google: any;
  }
}

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const router = useRouter();
  const { setUser } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleCredentialResponse = async (response: any) => {
    setIsLoading(true);
    try {
      const res = await fetch(SERVER_URL + "/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ idToken: response.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Google authentication failed.");
        return;
      }

      toast.success("Signed in with Google successfully!");
      setUser({
        id: data.user.id,
        name: data.user.username,
        email: data.user.email,
        role: data.user.role,
        verifiedReporter: data.user.verifiedReporter,
      });
      router.push("/");
    } catch {
      toast.error("Error communicating with authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeGoogleSignIn = () => {
    if (typeof window !== "undefined" && window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "422096514181-urhg17b84h7d1039psltecm9tsre64p9.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-btn"),
        {
          theme: "outline",
          size: "large",
          width: 350,
          text: "continue_with",
          shape: "rectangular",
        },
      );
    }
  };

  useEffect(() => {
    if (scriptLoaded) {
      initializeGoogleSignIn();
    }
  }, [scriptLoaded]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(SERVER_URL + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid credentials.");
        return;
      }

      toast.success("Welcome back!");
      setUser({
        id: data.user.id,
        name: data.user.username,
        email: data.user.email,
        role: data.user.role,
        verifiedReporter: data.user.verifiedReporter,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (
    demoEmail: string,
    demoPass: string,
    roleName: string,
  ) => {
    setIsLoading(true);
    try {
      const res = await fetch(SERVER_URL + "/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: demoEmail, password: demoPass }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Demo login failed. Make sure your server is running.");
        return;
      }

      toast.success("Logged in successfully as " + roleName + "!");
      setUser({
        id: data.user.id,
        name: data.user.username,
        email: data.user.email,
        role: data.user.role,
        verifiedReporter: data.user.verifiedReporter,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Server connection error during demo authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-none bg-background/50 backdrop-blur-md p-6 rounded-3xl shadow-xl">
          <CardBody className="space-y-6 flex flex-col items-center">
            <div className="text-center space-y-2 w-full">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
                Welcome Back
              </h1>
              <p className="text-sm text-default-400">
                Sign in to access your dashboard
              </p>
            </div>

            <div className="space-y-3 w-full">
              <span className="text-[10px] font-bold text-default-400 uppercase tracking-widest block text-center">
                Demo Portal Access
              </span>
              <div className="flex flex-row gap-2 w-full justify-between">
                <Button
                  onClick={() =>
                    handleDemoLogin(
                      "admin@nextmart.com",
                      "admin123",
                      "Administrator",
                    )
                  }
                  className="flex-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-[11px] font-bold py-2 rounded-xl border border-purple-500/10 h-10 px-2"
                >
                  As Admin
                </Button>
                <Button
                  onClick={() =>
                    handleDemoLogin(
                      "seller@nextmart.com",
                      "seller123",
                      "Verified Seller",
                    )
                  }
                  className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[11px] font-bold py-2 rounded-xl border border-amber-500/10 h-10 px-2"
                >
                  As Seller
                </Button>
                <Button
                  onClick={() =>
                    handleDemoLogin("user@nextmart.com", "user123", "Customer")
                  }
                  className="flex-1 bg-default-100 hover:bg-default-200 text-foreground/80 text-[11px] font-bold py-2 rounded-xl border border-default-200/50 h-10 px-2"
                >
                  As Customer
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full min-h-[44px]">
              <div id="google-signin-btn"></div>
            </div>

            <div className="relative flex py-2 items-center w-full">
              <div className="flex-grow border-t border-default-100"></div>
              <span className="flex-shrink mx-4 text-xs text-default-400 uppercase tracking-wider font-semibold">
                Or Use Credentials
              </span>
              <div className="flex-grow border-t border-default-100"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
                    "border-default-200 focus-within:border-primary h-11 bg-background",
                }}
                startContent={
                  <Mail className="size-4 text-default-400 pointer-events-none flex-shrink-0" />
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
                    "border-default-200 focus-within:border-primary h-11 bg-background",
                }}
                startContent={
                  <Lock className="size-4 text-default-400 pointer-events-none flex-shrink-0" />
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
                className="w-full font-bold text-md shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform duration-200"
              >
                Log In
              </Button>
            </form>

            <div className="text-center text-sm text-default-400 w-full">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-primary hover:underline"
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
