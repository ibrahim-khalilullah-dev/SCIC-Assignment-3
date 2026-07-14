"use client";

import { Card, CardBody } from "@heroui/react";
import { Truck, ShieldCheck, HeartHandshake, Sparkles } from "lucide-react";

export function ServiceSection() {
  const services = [
    {
      icon: <Truck className="size-8 text-primary" />,
      title: "Nationwide Shipping",
      description: "Fast, reliable, and secure nationwide product delivery.",
    },
    {
      icon: <ShieldCheck className="size-8 text-primary" />,
      title: "Secure Verification",
      description: "Encrypted checkout keeping payment records private.",
    },
    {
      icon: <HeartHandshake className="size-8 text-primary" />,
      title: "Customer Priority",
      description: "24/7 client desk supporting your post-purchase choices.",
    },
    {
      icon: <Sparkles className="size-8 text-primary" />,
      title: "Premium Catalog",
      description: "Curated goods with authenticated manufacturing standards.",
    },
  ];

  return (
    <section className="py-20 bg-background border-b">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((srv, idx) => (
            <Card
              key={idx}
              className="border-none shadow-sm bg-default-50 hover:scale-[1.02] transition-transform duration-300"
            >
              <CardBody className="p-6 space-y-4 flex flex-col items-center text-center">
                <div className="p-3 bg-primary/10 rounded-xl">{srv.icon}</div>
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground text-lg">
                    {srv.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {srv.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
