"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-default-50 overflow-hidden border-b">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div className="space-y-6 text-center lg:text-left">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
            The Ultimate Shopping Experience
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground leading-tight">
            Discover the Best of <span className="text-primary">NextMart</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
            Explore carefully curated collections featuring premium technology,
            timeless fashion pieces, and home essentials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              as={Link}
              href="/products"
              color="primary"
              size="lg"
              radius="sm"
              className="font-bold shadow-lg shadow-primary/25"
              startContent={<ShoppingBag className="size-5" />}
            >
              Shop Catalog
            </Button>
            <Button
              as={Link}
              href="/about"
              variant="bordered"
              size="lg"
              radius="sm"
              className="font-semibold text-foreground border-default-300 hover:bg-default-100"
            >
              Learn More
            </Button>
          </div>
        </div>

        <div className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden bg-default-100 border shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200"
            alt="Storefront Banner"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
