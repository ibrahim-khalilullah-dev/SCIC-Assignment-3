"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Checkbox,
} from "@heroui/react";
import {
  ArrowLeft,
  PlusCircle,
  DollarSign,
  Package,
  Image as ImageIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";

export default function AddProductPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [featured, setFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !category || !price || !image) {
      toast.error("Title, category, price, and image URL are required.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await apiFetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          category,
          image,
          price: Number(price),
          stock: Number(stock) || 0,
          featured,
          rating: 4.5,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create product.");
        return;
      }

      toast.success("Product created successfully!");
      router.push("/products");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-16 mx-auto px-6">
      <Button
        variant="light"
        color="default"
        radius="sm"
        onClick={() => router.push("/products")}
        className="mb-8 font-semibold text-default-600 hover:text-primary"
        startContent={<ArrowLeft className="size-4" />}
      >
        Back to Catalog
      </Button>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Add New Product
          </h1>
          <p className="text-muted-foreground">
            Fill in the details below to publish a new product in the NextMart
            catalog.
          </p>
        </div>

        <Card className="border-none shadow-xl bg-background/60 backdrop-blur-md p-4">
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                isRequired
                type="text"
                label="Product Title"
                placeholder="e.g. Wireless Noise-Cancelling Headphones"
                labelPlacement="outside"
                value={title}
                onValueChange={setTitle}
                variant="bordered"
                radius="sm"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  isRequired
                  type="text"
                  label="Category"
                  placeholder="e.g. Electronics"
                  labelPlacement="outside"
                  value={category}
                  onValueChange={setCategory}
                  variant="bordered"
                  radius="sm"
                />

                <Input
                  isRequired
                  type="text"
                  label="Image URL"
                  placeholder="https://images.unsplash.com/..."
                  labelPlacement="outside"
                  value={image}
                  onValueChange={setImage}
                  variant="bordered"
                  radius="sm"
                  startContent={
                    <ImageIcon className="size-4 text-default-400" />
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  isRequired
                  type="number"
                  label="Price (USD)"
                  placeholder="29.99"
                  labelPlacement="outside"
                  value={price}
                  onValueChange={setPrice}
                  variant="bordered"
                  radius="sm"
                  startContent={
                    <DollarSign className="size-4 text-default-400" />
                  }
                />

                <Input
                  type="number"
                  label="Initial Stock Level"
                  placeholder="100"
                  labelPlacement="outside"
                  value={stock}
                  onValueChange={setStock}
                  variant="bordered"
                  radius="sm"
                  startContent={<Package className="size-4 text-default-400" />}
                />
              </div>

              <Textarea
                label="Product Description"
                placeholder="Describe the product specifications, materials, and features..."
                labelPlacement="outside"
                value={description}
                onValueChange={setDescription}
                variant="bordered"
                radius="sm"
                minRows={4}
              />

              <Checkbox
                isSelected={featured}
                onValueChange={setFeatured}
                color="primary"
                className="text-foreground font-semibold"
              >
                Feature this product on home page
              </Checkbox>

              <Button
                type="submit"
                color="primary"
                variant="solid"
                radius="sm"
                isLoading={isLoading}
                className="w-full font-bold text-md shadow-lg shadow-primary/20"
                startContent={!isLoading && <PlusCircle className="size-5" />}
              >
                Create Product
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
