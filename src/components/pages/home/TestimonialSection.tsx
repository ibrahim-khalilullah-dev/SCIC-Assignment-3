"use client";

import { Card, CardBody, Avatar } from "@heroui/react";
import { Star } from "lucide-react";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Marcus Miller",
      role: "Lead Systems Architect",
      text: "NextMart has completely streamlined my procurement process. The Stripe payment gateway worked seamlessly, and the premium hardware items arrived in pristine condition ahead of schedule.",
      rating: 5,
      avatar: "",
    },
    {
      name: "Sarah Lindqvist",
      role: "E-Commerce Consultant",
      text: "The selection of electronics and minimal workspace accessories is highly curated and premium. I purchased a mechanical keyboard and received excellent developer support for my order queries.",
      rating: 5,
      avatar: "",
    },
    {
      name: "Daniel Kovac",
      role: "UI/UX Designer",
      text: "As a designer, I am extremely particular about build quality. The catalog descriptions match the physical products perfectly, and the responsive user dashboard made tracking my order effortless.",
      rating: 5,
      avatar: "",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
            Real Reviews
          </span>
          <h2 className="text-4xl font-black text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-md max-w-lg mx-auto">
            Discover why thousands of shoppers trust NextMart for their daily
            lifestyle selections.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="border-none shadow-sm bg-default-50">
              <CardBody className="p-6 space-y-6">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <Avatar
                    name={t.name}
                    size="sm"
                    src={t.avatar}
                    color="primary"
                    isBordered
                  />
                  <div>
                    <h4 className="font-bold text-foreground text-sm leading-none">
                      {t.name}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {t.role}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
