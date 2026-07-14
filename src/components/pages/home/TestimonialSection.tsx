"use client";

import { Card, CardBody, Avatar } from "@heroui/react";
import { Star } from "lucide-react";

export function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Verified Buyer",
      text: "NextMart has completely changed how I shop. The checkout was seamless, and the items arrived in premium packaging sooner than expected!",
      rating: 5,
      avatar: "",
    },
    {
      name: "Marcus Chen",
      role: "Tech enthusiast",
      text: "The selection of electronics is fantastic. Customer service helped me verify the specifications within minutes of submitting a request. Highly recommended!",
      rating: 5,
      avatar: "",
    },
    {
      name: "Elena Rostova",
      role: "Fashion Designer",
      text: "As a designer, I appreciate quality. The products I ordered are authentic and exactly as described in the catalog. Excellent responsive support.",
      rating: 5,
      avatar: "",
    },
  ];

  return (
    <section className="py-24 bg-background border-b">
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
