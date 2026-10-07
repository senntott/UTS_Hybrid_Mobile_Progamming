import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly storageKey = 'simobile-products';

  private readonly initialProducts: Product[] = [
    { id: 1, name: 'Beras Ramos 5 kg', category: 'Sembako', buyPrice: 65000, sellPrice: 72000, stock: 20 },
    { id: 2, name: 'Gula Pasir 1 kg', category: 'Sembako', buyPrice: 14500, sellPrice: 17000, stock: 35 },
    { id: 3, name: 'Minyak Goreng 1 L', category: 'Sembako', buyPrice: 16000, sellPrice: 19000, stock: 24 },
    { id: 4, name: 'Mi Instan', category: 'Makanan', buyPrice: 2500, sellPrice: 3500, stock: 60 },
    { id: 5, name: 'Telur 1 kg', category: 'Sembako', buyPrice: 26000, sellPrice: 30000, stock: 18 },
    { id: 6, name: 'Kopi Sachet', category: 'Minuman', buyPrice: 1200, sellPrice: 2000, stock: 50 },
    { id: 7, name: 'Teh Celup', category: 'Minuman', buyPrice: 7000, sellPrice: 9000, stock: 15 },
    { id: 8, name: 'Susu UHT 1 L', category: 'Minuman', buyPrice: 17000, sellPrice: 21000, stock: 12 },
    { id: 9, name: 'Sabun Mandi', category: 'Perawatan', buyPrice: 3500, sellPrice: 5000, stock: 0 },
    { id: 10, name: 'Air Mineral 600 ml', category: 'Minuman', buyPrice: 2500, sellPrice: 4000, stock: 30 }
  ];

  private readonly productsSubject =
    new BehaviorSubject<Product[]>([]);

  readonly products$ = this.productsSubject.asObservable();

  constructor() {
    this.productsSubject.next(this.loadProducts());
  }

  getProducts(): Product[] {
    return this.loadProducts().map(product => ({ ...product }));
  }

  getProductById(id: number): Product | undefined {
    const product = this.loadProducts().find(item => item.id === id);
    return product ? { ...product } : undefined;
  }

  getTotalProducts(): number {
    return this.loadProducts().length;
  }

  addProduct(product: Omit<Product, 'id'>): Product {
    const products = this.loadProducts();
    const nextId = products.length > 0
      ? Math.max(...products.map(item => item.id)) + 1
      : 1;

    const newProduct: Product = { ...product, id: nextId };
    products.push(newProduct);
    this.saveProducts(products);

    return { ...newProduct };
  }

  updateProduct(updatedProduct: Product): boolean {
    const products = this.loadProducts();
    const index = products.findIndex(item => item.id === updatedProduct.id);

    if (index === -1) {
      return false;
    }

    products[index] = { ...updatedProduct };
    this.saveProducts(products);
    return true;
  }

  deleteProduct(id: number): boolean {
    const products = this.loadProducts();
    const filteredProducts = products.filter(item => item.id !== id);

    if (filteredProducts.length === products.length) {
      return false;
    }

    this.saveProducts(filteredProducts);
    return true;
  }

  private loadProducts(): Product[] {
    const savedProducts = localStorage.getItem(this.storageKey);

    if (savedProducts) {
      try {
        const parsedProducts: unknown = JSON.parse(savedProducts);

        if (Array.isArray(parsedProducts)) {
          return parsedProducts as Product[];
        }
      } catch {
        // Data tidak valid akan diganti dengan data awal.
      }
    }

    this.saveProducts(this.initialProducts);
    return this.initialProducts.map(product => ({ ...product }));
  }

  private saveProducts(products: Product[]): void {
    const copy = products.map(product => ({ ...product }));

    localStorage.setItem(this.storageKey, JSON.stringify(copy));
    this.productsSubject.next(copy);
  }
}