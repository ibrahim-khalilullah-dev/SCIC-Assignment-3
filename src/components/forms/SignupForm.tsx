"use client";

import { useState, FormEvent } from "react";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

export function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name: username,
        userRole: "user",
        verifiedWriter: false,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Account registered successfully!");
      router.push("/");
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="w-full border border-default-100 bg-background/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <CardBody className="p-0 space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Create an Account
            </h1>
            <p className="text-xs text-default-500">
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
                inputWrapper:
                  "border-default-200 focus-within:border-primary h-10 bg-background",
              }}
              startContent={
                <User className="size-4 text-default-400 flex-shrink-0" />
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
              Sign Up
            </Button>
          </form>

          <div className="text-center text-xs text-default-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline ml-1"
            >
              Log In
            </Link>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}
