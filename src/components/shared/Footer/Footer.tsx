"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background mt-auto py-12">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="font-bold text-2xl tracking-wider text-primary"
          >
            NextMart
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your modern full-stack e-commerce experience. Discover carefully
            curated premium products.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">
            Shop Categories
          </h4>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                Fashion
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                Accessories
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                Home & Living
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Get in Touch</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">
            123 NextMart Boulevard, Dhaka, Bangladesh.
          </p>
          <p className="text-sm text-muted-foreground">support@nextmart.com</p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
        &copy; {currentYear} NextMart. All rights reserved.
      </div>
    </footer>
  );
}
