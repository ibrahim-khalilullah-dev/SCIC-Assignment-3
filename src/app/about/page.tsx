import { Award, Package, ShieldCheck, Truck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="container py-16 mx-auto">
      {/* Hero */}
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
          About Next Mart
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Your Trusted Online Shopping Destination
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          ShopNest is a modern e-commerce platform dedicated to providing
          quality products, secure shopping, and an exceptional customer
          experience. Whether you&apos;re looking for the latest technology,
          fashion, or everyday essentials, we&apos;ve got you covered.
        </p>
      </section>

      {/* Stats */}
      <section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="py-8 text-center">
            <h2 className="text-4xl font-bold">500+</h2>
            <p className="mt-2 text-muted-foreground">Products Available</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-8 text-center">
            <h2 className="text-4xl font-bold">10K+</h2>
            <p className="mt-2 text-muted-foreground">Happy Customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-8 text-center">
            <h2 className="text-4xl font-bold">24/7</h2>
            <p className="mt-2 text-muted-foreground">Customer Support</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-8 text-center">
            <h2 className="text-4xl font-bold">100%</h2>
            <p className="mt-2 text-muted-foreground">Secure Checkout</p>
          </CardContent>
        </Card>
      </section>

      {/* Mission */}
      <section className="mt-20 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold">Our Mission</h2>

          <p className="mt-6 text-muted-foreground leading-8">
            Our mission is to make online shopping simple, secure, and
            enjoyable. We carefully select high-quality products and strive to
            provide outstanding customer service, competitive pricing, and fast
            delivery to every customer.
          </p>

          <p className="mt-4 text-muted-foreground leading-8">
            We believe technology should simplify shopping while creating an
            experience customers can trust and enjoy.
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardContent className="flex items-start gap-4 py-6">
              <Truck className="mt-1 h-8 w-8 text-primary" />

              <div>
                <h3 className="font-semibold">Fast Delivery</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Reliable shipping with quick delivery across the country.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 py-6">
              <ShieldCheck className="mt-1 h-8 w-8 text-primary" />

              <div>
                <h3 className="font-semibold">Secure Shopping</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Your personal information and payments are protected with
                  modern security standards.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 py-6">
              <Package className="mt-1 h-8 w-8 text-primary" />

              <div>
                <h3 className="font-semibold">Premium Products</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Carefully selected products from trusted brands and suppliers.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-start gap-4 py-6">
              <Award className="mt-1 h-8 w-8 text-primary" />

              <div>
                <h3 className="font-semibold">Customer Satisfaction</h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  We prioritize customer experience in everything we do.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Closing */}
      <section className="mt-24 rounded-2xl bg-muted p-10 text-center">
        <h2 className="text-3xl font-bold">Thank You for Choosing Next Mart</h2>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          We&apos;re committed to delivering quality products, excellent
          service, and a seamless shopping experience. Your trust inspires us to
          keep improving every day.
        </p>
      </section>
    </main>
  );
}
