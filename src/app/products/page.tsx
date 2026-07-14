"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Star, Search, Filter } from "lucide-react";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import { TProduct } from "@/types/product";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function ProductsPage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = [
    "",
    "Electronics",
    "Fashion",
    "Accessories",
    "Home & Living",
  ];

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.set("search", search);
        if (category) queryParams.set("category", category);
        if (minPrice) queryParams.set("minPrice", minPrice);
        if (maxPrice) queryParams.set("maxPrice", maxPrice);

        const res = await fetch(
          `${SERVER_URL}/api/products?${queryParams.toString()}`,
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search, category, minPrice, maxPrice]);

  return (
    <section className="container py-16 mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
            Explore All Products
          </h2>
          <p className="mt-2 text-muted-foreground text-lg">
            Find and filter from our curated collection of standard premium
            goods.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 border-none shadow-md bg-default-50">
            <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <Filter className="size-5 text-primary" /> Filters
            </h3>

            <div className="space-y-4">
              <Input
                type="text"
                label="Search"
                placeholder="Product name..."
                labelPlacement="outside"
                value={search}
                onValueChange={setSearch}
                variant="bordered"
                radius="sm"
                startContent={<Search className="size-4 text-default-400" />}
              />

              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Category
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      size="sm"
                      radius="sm"
                      variant={category === cat ? "solid" : "bordered"}
                      color={category === cat ? "primary" : "default"}
                      onClick={() => setCategory(cat)}
                      className="font-medium text-xs"
                    >
                      {cat === "" ? "All" : cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Price Range
                </span>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    variant="bordered"
                    radius="sm"
                    value={minPrice}
                    onValueChange={setMinPrice}
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    variant="bordered"
                    radius="sm"
                    value={maxPrice}
                    onValueChange={setMaxPrice}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex h-96 items-center justify-center">
              <Spinner size="lg" color="primary" label="Loading catalog..." />
            </div>
          ) : products.length === 0 ? (
            <div className="flex h-96 flex-col items-center justify-center rounded-xl border border-dashed text-center p-8">
              <p className="text-muted-foreground text-lg font-medium">
                No products matched your parameters.
              </p>
              <Button
                size="sm"
                variant="light"
                color="primary"
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setMinPrice("");
                  setMaxPrice("");
                }}
                className="mt-2 font-bold"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 bg-background"
                >
                  <CardBody className="p-0 relative">
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
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

                      <h3 className="line-clamp-1 text-lg font-bold text-foreground">
                        {product.title}
                      </h3>

                      <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between border-t pt-4">
                        <span className="text-2xl font-black text-foreground">
                          ${product.price}
                        </span>
                        <Button
                          as={Link}
                          href={`/products/${product.id}`}
                          size="sm"
                          color="primary"
                          radius="sm"
                          className="font-bold"
                          endContent={<ArrowRight className="size-4" />}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
