export type TProduct = {
  id?: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  featured: boolean;
  image: string;
  description: string;
  sellerId?: string;
  sellerName?: string;
  sellerEmail?: string;
  status?: "Available" | "Sold" | "Unpublished";
};
