"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-default-50 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-primary/10 to-secondary/5 blur-[120px]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div className="space-y-6 text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full"
          >
            The Ultimate Shopping Experience
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-foreground leading-tight"
          >
            Discover the Best of{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NextMart
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-default-500 leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            Explore carefully curated collections featuring premium technology,
            timeless fashion pieces, and home essentials.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button
              as={Link}
              href="/products"
              color="primary"
              size="lg"
              radius="sm"
              className="font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
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
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden bg-default-100 border shadow-xl group"
        >
          <img
            src="/hero-banner.png"
            alt="NextMart Premium Storefront"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
}
