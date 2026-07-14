"use client";

import { useState, FormEvent } from "react";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { setUser } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${SERVER_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed.");
        return;
      }

      toast.success("Account registered successfully!");
      setUser({
        id: data.user.id,
        name: data.user.username,
        email: data.user.email,
        role: data.user.role,
      });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-2xl bg-background/60 backdrop-blur-md py-6 px-4">
      <CardBody className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Create an Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign up below to start shopping at NextMart
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            isRequired
            type="text"
            label="Username"
            placeholder="johndoe"
            labelPlacement="outside"
            value={username}
            onValueChange={setUsername}
            variant="bordered"
            radius="sm"
            classNames={{
              inputWrapper: "border-default-200 focus-within:border-primary",
            }}
            startContent={
              <User className="size-4 text-default-400 pointer-events-none flex-shrink-0" />
            }
          />

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
            Sign Up
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Log In
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
