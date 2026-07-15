"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Search,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import { motion } from "framer-motion";
import { TProduct } from "@/types/product";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const getValidImageUrl = (src: string) => {
  if (!src)
    return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";
  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/")
  ) {
    return src;
  }
  return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";
};

export default function ProductsPage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = [
    { label: "All Categories", value: "" },
    { label: "Electronics", value: "Electronics" },
    { label: "Fashion", value: "Fashion" },
    { label: "Accessories", value: "Accessories" },
    { label: "Home & Living", value: "Home & Living" },
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

  const handleResetFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="container py-16 mx-auto px-6 max-w-7xl">
      <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
          Marketplace Catalog
        </span>
        <h1 className="text-4xl font-black text-foreground">
          Explore All Products
        </h1>
        <p className="text-default-500 text-sm leading-relaxed">
          Discover curated modern essentials published by verified vendors
          worldwide.
        </p>
      </div>

      <div className="bg-default-50/50 backdrop-blur-md border-none p-6 rounded-3xl shadow-sm mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5 flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-default-400 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-primary" /> Search Catalog
            </span>
            <Input
              type="text"
              placeholder="Search products by title or seller..."
              value={search}
              onValueChange={setSearch}
              variant="bordered"
              radius="sm"
              classNames={{
                inputWrapper:
                  "border-default-200 focus-within:border-primary h-11 bg-background",
              }}
            />
          </div>

          <div className="md:col-span-3 flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-default-400 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />{" "}
              Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-background border-2 border-default-200 rounded-lg h-11 px-3 text-sm focus:border-primary outline-none transition cursor-pointer text-default-700"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3 flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-default-400">
              Price Boundary ($)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                variant="bordered"
                radius="sm"
                value={minPrice}
                onValueChange={setMinPrice}
                classNames={{
                  inputWrapper:
                    "border-default-200 focus-within:border-primary h-11 bg-background",
                }}
              />
              <Input
                type="number"
                placeholder="Max"
                variant="bordered"
                radius="sm"
                value={maxPrice}
                onValueChange={setMaxPrice}
                classNames={{
                  inputWrapper:
                    "border-default-200 focus-within:border-primary h-11 bg-background",
                }}
              />
            </div>
          </div>

          <div className="md:col-span-1 flex justify-end">
            <Button
              isIconOnly
              onClick={handleResetFilters}
              variant="flat"
              radius="sm"
              className="w-full h-11 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/10"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <Spinner size="lg" color="primary" label="Filtering marketplace..." />
        </div>
      ) : products.length === 0 ? (
        <div className="flex h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-default-200 text-center p-8 bg-default-50/50">
          <p className="text-default-500 text-base font-semibold">
            No products matched your exact filter parameters.
          </p>
          <Button
            size="sm"
            variant="flat"
            color="primary"
            onClick={handleResetFilters}
            className="mt-4 font-bold"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => {
            const pId = product.id || (product as any)._id;

            return (
              <motion.div key={pId} variants={cardVariants}>
                <Card className="group overflow-hidden border border-default-100 bg-background/50 hover:bg-background/80 hover:shadow-xl transition-all duration-300 rounded-[20px]">
                  <CardBody className="p-0 relative flex flex-col justify-between h-full">
                    <div className="relative aspect-square w-full overflow-hidden bg-default-100">
                      <Image
                        src={getValidImageUrl(product.image)}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground border border-default-100/50">
                          {product.category}
                        </span>
                        {product.status === "Sold" && (
                          <span className="rounded-full bg-danger/10 backdrop-blur-md border border-danger/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-danger">
                            Sold Out
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-grow gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-default-400 truncate max-w-[120px]">
                            {product.sellerName || "Independent"}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-bold text-default-600">
                              {product.rating}
                            </span>
                          </div>
                        </div>

                        <h3 className="line-clamp-1 text-md font-bold text-foreground hover:text-primary transition-colors">
                          <Link href={`/products/${pId}`}>{product.title}</Link>
                        </h3>

                        <p className="line-clamp-2 text-xs text-default-500 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-default-100/50 pt-4 mt-auto">
                        <span className="text-xl font-black text-foreground">
                          ${parseFloat(product.price.toString()).toFixed(2)}
                        </span>
                        <Button
                          as={Link}
                          href={`/products/${pId}`}
                          size="sm"
                          color="primary"
                          radius="sm"
                          className="font-bold text-xs shadow-md shadow-primary/10 group-hover:shadow-primary/20"
                          endContent={<ArrowRight className="size-3.5" />}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
