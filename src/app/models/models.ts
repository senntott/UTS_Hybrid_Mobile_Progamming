export interface Product {
  id: number;
  name: string;
  category: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  image: string; // kosong = belum ada foto
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface TransactionItem {
  productId: number;
  name: string;
  price: number;
  qty: number;
}

export interface Transaction {
  id: number;
  date: Date;
  items: TransactionItem[];
  total: number;
}