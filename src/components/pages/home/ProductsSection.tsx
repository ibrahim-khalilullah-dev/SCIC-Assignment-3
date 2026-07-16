"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button, Card, CardBody, Spinner } from "@heroui/react";
import { TProduct } from "@/types/product";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const getValidImageUrl = (src: string) => {
  if (!src) return "/placeholder-product.png";
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/")
  ) {
    return src;
  }
  return "/placeholder-product.png";
};

export function FeaturedProductsSection() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch(`${SERVER_URL}/api/products`);
        const data = (await res.json()) as TProduct[];
        const featured = data.filter((p) => p.featured).slice(0, 3);
        setProducts(featured.length > 0 ? featured : data.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
          label="Loading featured products..."
        />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-default-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
              Handpicked Deals
            </span>
            <h2 className="text-4xl font-black text-foreground mt-2">
              Featured Products
            </h2>
          </div>
          <Button
            as={Link}
            href="/products"
            variant="flat"
            color="primary"
            radius="sm"
            className="font-bold border-none"
            endContent={<ArrowRight className="size-4" />}
          >
            View All
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const pId = product.id || (product as any)._id;

            return (
              <Card
                key={pId}
                className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-background"
              >
                <CardBody className="p-0 relative">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={getValidImageUrl(product.image)}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="line-clamp-1 text-lg font-bold text-foreground hover:text-primary transition-colors">
                      <Link href={`/products/${pId}`}>{product.title}</Link>
                    </h3>

                    <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-default-100/50 pt-4">
                      <span className="text-2xl font-black text-foreground">
                        ${product.price}
                      </span>
                      <Button
                        as={Link}
                        href={`/products/${pId}`}
                        size="sm"
                        color="primary"
                        radius="sm"
                        className="font-bold border-none"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
