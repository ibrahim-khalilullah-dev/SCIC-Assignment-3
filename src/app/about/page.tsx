"use client";

import { Award, Package, ShieldCheck, Truck } from "lucide-react";
import { Card, CardBody } from "@heroui/react";

export default function AboutPage() {
  return (
    <main className="container py-16 mx-auto px-6 max-w-7xl">
      <section className="mx-auto max-w-4xl text-center space-y-4">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
          About Next Mart
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl text-foreground">
          Your Trusted Online Shopping Destination
        </h1>

        <p className="mx-auto text-md text-default-500 leading-relaxed max-w-2xl">
          ShopNest is a modern e-commerce platform dedicated to providing
          quality products, secure shopping, and an exceptional customer
          experience. Whether you are looking for the latest technology,
          fashion, or everyday essentials, we have got you covered.
        </p>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-default-50/50">
          <CardBody className="py-8 text-center space-y-1">
            <h2 className="text-4xl font-black text-foreground">500+</h2>
            <p className="text-xs text-default-400 font-semibold uppercase tracking-wider">
              Products Available
            </p>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm bg-default-50/50">
          <CardBody className="py-8 text-center space-y-1">
            <h2 className="text-4xl font-black text-foreground">10K+</h2>
            <p className="text-xs text-default-400 font-semibold uppercase tracking-wider">
              Happy Customers
            </p>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm bg-default-50/50">
          <CardBody className="py-8 text-center space-y-1">
            <h2 className="text-4xl font-black text-foreground">24/7</h2>
            <p className="text-xs text-default-400 font-semibold uppercase tracking-wider">
              Customer Support
            </p>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm bg-default-50/50">
          <CardBody className="py-8 text-center space-y-1">
            <h2 className="text-4xl font-black text-foreground">100%</h2>
            <p className="text-xs text-default-400 font-semibold uppercase tracking-wider">
              Secure Checkout
            </p>
          </CardBody>
        </Card>
      </section>

      <section className="mt-20 grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-extrabold text-foreground">
            Our Mission
          </h2>

          <p className="text-default-500 text-sm leading-relaxed">
            Our mission is to make online shopping simple, secure, and
            enjoyable. We carefully select high-quality products and strive to
            provide outstanding customer service, competitive pricing, and fast
            delivery to every customer.
          </p>

          <p className="text-default-500 text-sm leading-relaxed">
            We believe technology should simplify shopping while creating an
            experience customers can trust and enjoy.
          </p>
        </div>

        <div className="grid gap-4">
          <Card className="border-none shadow-sm bg-default-50/50">
            <CardBody className="flex flex-row items-center gap-4 p-5">
              <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">
                  Fast Delivery
                </h3>
                <p className="text-xs text-default-400 leading-relaxed mt-0.5">
                  Reliable shipping with quick delivery across the country.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-sm bg-default-50/50">
            <CardBody className="flex flex-row items-center gap-4 p-5">
              <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">
                  Secure Shopping
                </h3>
                <p className="text-xs text-default-400 leading-relaxed mt-0.5">
                  Your personal information and payments are protected with
                  modern security standards.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-sm bg-default-50/50">
            <CardBody className="flex flex-row items-center gap-4 p-5">
              <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">
                  Premium Products
                </h3>
                <p className="text-xs text-default-400 leading-relaxed mt-0.5">
                  Carefully selected products from trusted brands and suppliers.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="mt-24 rounded-3xl bg-default-50/50 p-10 text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-foreground">
          Thank You for Choosing Next Mart
        </h2>

        <p className="mx-auto max-w-xl text-xs text-default-400 leading-relaxed">
          We are committed to delivering quality products, excellent service,
          and a seamless shopping experience. Your trust inspires us to keep
          improving every day.
        </p>
      </section>
    </main>
  );
}
