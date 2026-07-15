"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Checkbox,
  Spinner,
} from "@heroui/react";
import { ArrowLeft, Save, DollarSign, Package, Upload } from "lucide-react";
import toast from "react-hot-toast";
import { TProduct } from "@/types/product";

const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [featured, setFeatured] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      try {
        const res = await fetch(`${SERVER_URL}/api/products/${id}`);
        if (res.ok) {
          const p: TProduct = await res.json();
          setTitle(p.title);
          setDescription(p.description);
          setCategory(p.category);
          setImage(p.image);
          setPrice(String(p.price));
          setStock(String(p.stock));
          setFeatured(p.featured);
        } else {
          toast.error("Product not found.");
        }
      } catch {
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File exceeds 5MB size limit.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const payload = await res.json();
      if (payload.success) {
        setImage(payload.data.url);
        toast.success("Image updated successfully.");
      } else {
        toast.error("Image upload failed.");
      }
    } catch {
      toast.error("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !category || !price || !image) {
      toast.error("Title, category, price, and image are required.");
      return;
    }

    setIsSaving(true);

    try {
      const res = await fetch(`${SERVER_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          category,
          image,
          price: Number(price),
          stock: Number(stock) || 0,
          featured,
        }),
      });

      if (res.ok) {
        toast.success("Product updated successfully!");
        router.push("/dashboard/reporter/products");
        router.refresh();
      } else {
        toast.error("Failed to save updates.");
      }
    } catch {
      toast.error("Error communicating with server.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading product details..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="light"
        color="default"
        radius="sm"
        onClick={() => router.push("/dashboard/reporter/products")}
        className="font-semibold text-default-600 hover:text-primary w-fit"
        startContent={<ArrowLeft className="size-4" />}
      >
        Back to Catalog
      </Button>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Modify Product
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Update the catalog properties and metadata for your listing.
          </p>
        </div>

        <Card className="border-none shadow-md bg-default-50 p-4">
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
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-default-50 border-2 rounded-lg h-10 px-3 text-sm focus:border-primary outline-none transition cursor-pointer"
                  >
                    {[
                      "Electronics",
                      "Fashion",
                      "Accessories",
                      "Home & Living",
                    ].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Product Cover Image
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="w-10 h-10 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer relative overflow-hidden bg-default-100 shrink-0">
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      {image ? (
                        <img
                          src={image}
                          alt="Cover Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload className="w-4 h-4 text-default-400" />
                      )}
                    </label>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold block text-foreground truncate">
                        {isUploading
                          ? "Uploading to ImgBB..."
                          : "Change Image PNG, JPG"}
                      </span>
                      <span className="text-[10px] text-muted-foreground block truncate">
                        Max image file size is 5MB
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  isRequired
                  type="number"
                  step="0.01"
                  label="Price (USD)"
                  placeholder="29.99"
                  labelPlacement="outside"
                  value={price}
                  onValueChange={setPrice}
                  variant="bordered"
                  radius="sm"
                  startContent={
                    <DollarSign className="size-4 text-default-400 shrink-0" />
                  }
                />

                <Input
                  type="number"
                  label="Stock Level"
                  placeholder="100"
                  labelPlacement="outside"
                  value={stock}
                  onValueChange={setStock}
                  variant="bordered"
                  radius="sm"
                  startContent={
                    <Package className="size-4 text-default-400 shrink-0" />
                  }
                />
              </div>

              <Textarea
                label="Product Description"
                placeholder="Describe the product specifications, materials, and highlights..."
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

              <div className="pt-4 border-t flex justify-end gap-3">
                <Button
                  type="button"
                  variant="flat"
                  radius="sm"
                  onClick={() => router.push("/dashboard/reporter/products")}
                  className="font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="solid"
                  radius="sm"
                  isLoading={isSaving}
                  disabled={isSaving || isUploading}
                  className="font-bold shadow-lg shadow-primary/20"
                  startContent={!isSaving && <Save className="size-4" />}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
