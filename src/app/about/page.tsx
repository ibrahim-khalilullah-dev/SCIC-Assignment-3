"use client";

import { Award, Package, ShieldCheck, Truck } from "lucide-react";
import { Card, CardBody } from "@heroui/react";

export default function AboutPage() {
  return (
    <main className="container py-16 mx-auto px-6">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-primary">
          About Next Mart
        </p>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl text-foreground">
          Your Trusted Online Shopping Destination
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">
          ShopNest is a modern e-commerce platform dedicated to providing
          quality products, secure shopping, and an exceptional customer
          experience. Whether you&apos;re looking for the latest technology,
          fashion, or everyday essentials, we&apos;ve got you covered.
        </p>
      </section>

      <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm bg-default-50">
          <CardBody className="py-8 text-center space-y-1">
            <h2 className="text-4xl font-black text-foreground">500+</h2>
            <p className="text-sm text-muted-foreground font-semibold">
              Products Available
            </p>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm bg-default-50">
          <CardBody className="py-8 text-center space-y-1">
            <h2 className="text-4xl font-black text-foreground">10K+</h2>
            <p className="text-sm text-muted-foreground font-semibold">
              Happy Customers
            </p>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm bg-default-50">
          <CardBody className="py-8 text-center space-y-1">
            <h2 className="text-4xl font-black text-foreground">24/7</h2>
            <p className="text-sm text-muted-foreground font-semibold">
              Customer Support
            </p>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm bg-default-50">
          <CardBody className="py-8 text-center space-y-1">
            <h2 className="text-4xl font-black text-foreground">100%</h2>
            <p className="text-sm text-muted-foreground font-semibold">
              Secure Checkout
            </p>
          </CardBody>
        </Card>
      </section>

      <section className="mt-20 grid items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>

          <p className="text-muted-foreground leading-relaxed">
            Our mission is to make online shopping simple, secure, and
            enjoyable. We carefully select high-quality products and strive to
            provide outstanding customer service, competitive pricing, and fast
            delivery to every customer.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            We believe technology should simplify shopping while creating an
            experience customers can trust and enjoy.
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="border-none shadow-sm bg-default-50">
            <CardBody className="flex flex-row items-start gap-4 p-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reliable shipping with quick delivery across the country.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-sm bg-default-50">
            <CardBody className="flex flex-row items-start gap-4 p-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">Secure Shopping</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your personal information and payments are protected with
                  modern security standards.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-sm bg-default-50">
            <CardBody className="flex flex-row items-start gap-4 p-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">Premium Products</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Carefully selected products from trusted brands and suppliers.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-sm bg-default-50">
            <CardBody className="flex flex-row items-start gap-4 p-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground">
                  Customer Satisfaction
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We prioritize customer experience in everything we do.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="mt-24 rounded-2xl bg-default-50 border p-10 text-center space-y-4">
        <h2 className="text-3xl font-extrabold text-foreground">
          Thank You for Choosing Next Mart
        </h2>

        <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
          We&apos;re committed to delivering quality products, excellent
          service, and a seamless shopping experience. Your trust inspires us to
          keep improving every day.
        </p>
      </section>
    </main>
  );
}
