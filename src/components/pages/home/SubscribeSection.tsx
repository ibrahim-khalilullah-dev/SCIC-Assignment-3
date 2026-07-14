"use client";

import { useState, FormEvent } from "react";
import { Card, CardBody, Input, Button } from "@heroui/react";
import { Send } from "lucide-react";
import toast from "react-hot-toast";

export function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast.success("Thank you for subscribing to NextMart!");
      setEmail("");
      setIsLoading(false);
    }, 800);
  };

  return (
    <section className="py-24 bg-default-50">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <Card className="border-none shadow-xl bg-background p-6 md:p-10">
          <CardBody className="p-0 text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-foreground">
                Stay in the Loop
              </h2>
              <p className="text-muted-foreground text-sm md:text-md max-w-md mx-auto">
                Subscribe to our newsletter and get exclusive access to product
                releases, flash deals, and promotions.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto w-full"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onValueChange={setEmail}
                variant="bordered"
                radius="sm"
                className="flex-grow"
              />
              <Button
                type="submit"
                color="primary"
                radius="sm"
                isLoading={isLoading}
                className="font-bold px-6 shadow-lg shadow-primary/20"
                endContent={!isLoading && <Send className="size-4" />}
              >
                Subscribe
              </Button>
            </form>
          </CardBody>
        </Card> 
      </div>
    </section>
  );
}
