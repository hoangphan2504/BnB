export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  importPrice: number;
  brandName: string;
  categoryId: string;
  inventory: number;
  sold: number;
  images: string[];
}
