import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';
import { ProductService } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'simobile-cart';

  constructor(private productService: ProductService) {}

  getItems(): CartItem[] {
    return this.loadItems().map(item => ({ ...item }));
  }

  addProduct(product: Product): boolean {
    const currentProduct = this.productService.getProductById(product.id);

    if (!currentProduct || currentProduct.stock <= 0) {
      return false;
    }

    const items = this.loadItems();
    const existingItem = items.find(item => item.productId === product.id);

    if (existingItem) {
      if (existingItem.qty >= currentProduct.stock) {
        return false;
      }

      existingItem.qty += 1;
    } else {
      items.push({
        productId: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.sellPrice,
        qty: 1,
        image: currentProduct.image
      });
    }

    this.saveItems(items);
    return true;
  }

  updateQuantity(productId: number, quantity: number): boolean {
    const items = this.loadItems();
    const item = items.find(cartItem => cartItem.productId === productId);

    if (!item) {
      return false;
    }

    if (quantity <= 0) {
      return this.removeProduct(productId);
    }

    const product = this.productService.getProductById(productId);

    if (!product || quantity > product.stock) {
      return false;
    }

    item.qty = quantity;
    this.saveItems(items);
    return true;
  }

  removeProduct(productId: number): boolean {
    const items = this.loadItems();
    const filteredItems = items.filter(item => item.productId !== productId);

    if (filteredItems.length === items.length) {
      return false;
    }

    this.saveItems(filteredItems);
    return true;
  }

  clearCart(): void {
    this.saveItems([]);
  }

  getItemCount(): number {
    return this.loadItems().reduce((total, item) => total + item.qty, 0);
  }

  getTotal(): number {
    return this.loadItems().reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  }

  private loadItems(): CartItem[] {
    const savedItems = localStorage.getItem(this.storageKey);

    if (!savedItems) {
      return [];
    }

    try {
      const parsedItems: unknown = JSON.parse(savedItems);
      return Array.isArray(parsedItems) ? parsedItems as CartItem[] : [];
    } catch {
      return [];
    }
  }

  private saveItems(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}