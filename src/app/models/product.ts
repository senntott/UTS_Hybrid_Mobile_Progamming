export interface Product {
  id: number;
  name: string;
  category: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  image?: string;
}