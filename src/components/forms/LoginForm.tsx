"use client";

import { useState, FormEvent } from "react";
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
import { auth, googleProvider, signInWithPopup } from "@/lib/firebase";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { setUser } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${SERVER_URL}/api/auth/login`, {
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
      const res = await fetch(`${SERVER_URL}/api/auth/login`, {
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

      toast.success(`Logged in successfully as ${roleName}!`);
      setUser({
        id: data.user.id,
        name: data.user.username,
        email: data.user.email,
        role: data.user.role,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Server connection error during demo authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!auth || !googleProvider) {
      toast.error(
        "Google Login is not configured. Please add your Firebase credentials to the .env file.",
      );
      return;
    }

    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credentialToken = await result.user.getIdToken();

      const res = await fetch(`${SERVER_URL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ idToken: credentialToken }),
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
      });
      router.push("/");
    } catch (error: any) {
      console.error(error);
      if (error.code !== "auth/popup-closed-by-user") {
        toast.error("Google login failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <Card className="border-none shadow-2xl bg-background/60 backdrop-blur-md py-6 px-4">
        <CardBody className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Log in below to access your account
            </p>
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
                inputWrapper: "border-default-200 focus-within:border-primary",
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
                inputWrapper: "border-default-200 focus-within:border-primary",
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

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-default-200"></div>
            <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase">
              Or continue with
            </span>
            <div className="flex-grow border-t border-default-200"></div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            variant="bordered"
            radius="sm"
            className="w-full font-semibold text-default-700 hover:bg-default-100 transition-colors"
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
            Sign in with Google
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </CardBody>
      </Card>

      <Card className="border-none shadow-xl bg-default-50 p-2">
        <CardBody className="space-y-4">
          <div className="text-center space-y-1">
            <h4 className="font-bold text-foreground text-md">
              One-Click Quick Login
            </h4>
            <p className="text-xs text-muted-foreground">
              For examiners to instantly authenticate
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              size="sm"
              color="secondary"
              variant="flat"
              radius="sm"
              onClick={() =>
                handleDemoLogin(
                  "admin@nextmart.com",
                  "admin123",
                  "Administrator",
                )
              }
              startContent={<ShieldAlert className="size-4" />}
              className="font-bold"
            >
              As Admin
            </Button>
            <Button
              size="sm"
              color="default"
              variant="bordered"
              radius="sm"
              onClick={() =>
                handleDemoLogin("user@nextmart.com", "user123", "Customer")
              }
              startContent={<UserCheck className="size-4" />}
              className="font-bold"
            >
              As Customer
            </Button>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              radius="sm"
              onClick={() =>
                handleDemoLogin(
                  "verified@nextmart.com",
                  "seller123",
                  "Verified Seller",
                )
              }
              startContent={<Briefcase className="size-4" />}
              className="font-bold col-span-1"
            >
              As Verified Seller
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="flat"
              radius="sm"
              onClick={() =>
                handleDemoLogin("new@nextmart.com", "seller123", "New Seller")
              }
              startContent={<Briefcase className="size-4" />}
              className="font-bold col-span-1"
            >
              As New Seller (Locked)
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
