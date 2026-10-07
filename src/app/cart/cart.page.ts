import { Component } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { CartService } from '../services/cart';
import { ProductService } from '../services/product';
import { TransactionService } from '../services/transaction';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false
})
export class CartPage {
  items: CartItem[] = [];
  total = 0;
  message = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private transactionService: TransactionService
  ) {}

  ionViewWillEnter(): void {
    this.loadCart();
    this.message = '';
  }

  changeQuantity(item: CartItem, quantity: number): void {
    const updated = this.cartService.updateQuantity(item.productId, quantity);

    if (!updated) {
      this.message = 'Jumlah melebihi stok produk yang tersedia.';
    } else {
      this.message = '';
    }

    this.loadCart();
  }

  removeItem(item: CartItem): void {
    this.cartService.removeProduct(item.productId);
    this.loadCart();
  }

  checkout(): void {
    if (this.items.length === 0) {
      this.message = 'Keranjang masih kosong.';
      return;
    }

    for (const item of this.items) {
      const product = this.productService.getProductById(item.productId);

      if (!product || product.stock < item.qty) {
        this.message = `Stok ${item.name} tidak mencukupi. Periksa kembali keranjang.`;
        return;
      }
    }

    const transaction = this.transactionService.addTransaction({
      date: new Date().toISOString(),
      items: this.items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        qty: item.qty
      })),
      total: this.total
    });

    for (const item of this.items) {
      const product = this.productService.getProductById(item.productId);

      if (product) {
        this.productService.updateProduct({
          ...product,
          stock: product.stock - item.qty
        });
      }
    }

    this.cartService.clearCart();
    this.loadCart();
    this.message = `Transaksi #${transaction.id} berhasil disimpan.`;
  }

  private loadCart(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }
}