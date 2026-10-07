export interface TransactionItem {
  productId: number;
  name: string;
  price: number;
  qty: number;
}

export interface Transaction {
  id: number;
  date: string;
  items: TransactionItem[];
  total: number;
}