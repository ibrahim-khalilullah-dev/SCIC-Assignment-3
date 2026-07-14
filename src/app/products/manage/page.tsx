"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import {
  Trash2,
  Edit3,
  ArrowLeft,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";
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

export default function ManageProductsPage() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Failed to delete product.");
        return;
      }

      toast.success("Product deleted successfully.");
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during deletion.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenEdit = (product: TProduct) => {
    setEditId(product.id || "");
    setEditTitle(product.title);
    setEditCategory(product.category);
    setEditImage(product.image);
    setEditPrice(String(product.price));
    setEditStock(String(product.stock));
    setEditDescription(product.description);
    onOpen();
  };

  const handleUpdate = async () => {
    if (!editTitle || !editCategory || !editPrice || !editImage) {
      toast.error("Required fields cannot be left empty.");
      return;
    }

    setIsMutating(true);

    try {
      const res = await fetch(`${SERVER_URL}/api/products/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: editTitle,
          category: editCategory,
          image: editImage,
          price: Number(editPrice),
          stock: Number(editStock) || 0,
          description: editDescription,
        }),
      });

      if (!res.ok) {
        toast.error("Failed to update product.");
        return;
      }

      toast.success("Product updated successfully!");
      setProducts(
        products.map((p) =>
          p.id === editId
            ? {
                ...p,
                title: editTitle,
                category: editCategory,
                image: editImage,
                price: Number(editPrice),
                stock: Number(editStock),
                description: editDescription,
              }
            : p,
        ),
      );
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsMutating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Spinner
          size="lg"
          color="primary"
          label="Loading product control desk..."
        />
      </div>
    );
  }

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

      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Manage Products
          </h1>
          <p className="text-muted-foreground">
            Monitor, edit, or remove published catalog items securely from this
            administrator control desk.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex h-96 flex-col items-center justify-center rounded-xl border border-dashed text-center p-8">
            <p className="text-muted-foreground text-lg font-medium">
              No products found in database.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <Card
                key={product.id}
                className="border-none shadow-md bg-background"
              >
                <CardBody className="p-4 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative size-16 overflow-hidden rounded-lg bg-default-100 flex-shrink-0 border">
                      <Image
                        src={getValidImageUrl(product.image)}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-foreground line-clamp-1 text-lg">
                        {product.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-semibold">
                        <span className="text-primary uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span>•</span>
                        <span>Price: ${product.price}</span>
                        <span>•</span>
                        <span>Stock: {product.stock} units</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-end w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                    {deletingId === product.id ? (
                      <div className="flex items-center gap-2 animate-fade-in">
                        <span className="text-xs font-bold text-danger flex items-center gap-1">
                          <AlertTriangle className="size-3" /> Confirm Delete?
                        </span>
                        <Button
                          size="sm"
                          color="danger"
                          radius="sm"
                          isIconOnly
                          onClick={() => handleDelete(product.id || "")}
                        >
                          <Check className="size-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="bordered"
                          radius="sm"
                          isIconOnly
                          onClick={() => setDeletingId(null)}
                        >
                          <X className="size-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          radius="sm"
                          onClick={() => handleOpenEdit(product)}
                          startContent={<Edit3 className="size-4" />}
                          className="font-bold"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          variant="light"
                          radius="sm"
                          isIconOnly
                          onClick={() => setDeletingId(product.id || null)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="sm"
        className="bg-background text-foreground"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 font-extrabold text-2xl">
            Modify Product
          </ModalHeader>
          <ModalBody className="space-y-4">
            <Input
              isRequired
              type="text"
              label="Product Title"
              value={editTitle}
              onValueChange={setEditTitle}
              variant="bordered"
              radius="sm"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                isRequired
                type="text"
                label="Category"
                value={editCategory}
                onValueChange={setEditCategory}
                variant="bordered"
                radius="sm"
              />
              <Input
                isRequired
                type="number"
                label="Price (USD)"
                value={editPrice}
                onValueChange={setEditPrice}
                variant="bordered"
                radius="sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                isRequired
                type="text"
                label="Image URL"
                value={editImage}
                onValueChange={setEditImage}
                variant="bordered"
                radius="sm"
              />
              <Input
                type="number"
                label="Stock Level"
                value={editStock}
                onValueChange={setEditStock}
                variant="bordered"
                radius="sm"
              />
            </div>
            <Textarea
              label="Description"
              value={editDescription}
              onValueChange={setEditDescription}
              variant="bordered"
              radius="sm"
              minRows={3}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              radius="sm"
              onClick={onClose}
              className="font-semibold"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              radius="sm"
              isLoading={isMutating}
              onClick={handleUpdate}
              className="font-bold shadow-lg shadow-primary/20"
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
