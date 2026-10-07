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
  showSuccess = false;
  lastId = 0;
  lastTotal = 0;
  alertButtons = ['Selesai'];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private transactionService: TransactionService
  ) {}

  ionViewWillEnter() {
    this.refresh();
    this.message = '';
  }

  refresh() {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  changeQuantity(item: CartItem, quantity: number) {
    const updated = this.cartService.updateQuantity(item.productId, quantity);
    this.message = updated ? '' : 'Jumlah melebihi stok produk yang tersedia.';
    this.refresh();
  }

  removeItem(item: CartItem) {
    this.cartService.removeProduct(item.productId);
    this.message = '';
    this.refresh();
  }

  checkout() {
    const currentItems = this.cartService.getItems();

    if (currentItems.length == 0) {
      this.message = 'Keranjang masih kosong.';
      return;
    }

    for (let i = 0; i < currentItems.length; i++) {
      const product = this.productService.getProductById(currentItems[i].productId);
      if (!product || product.stock < currentItems[i].qty) {
        this.message = 'Stok ' + currentItems[i].name + ' tidak mencukupi.';
        return;
      }
    }

    const total = this.cartService.getTotal();
    const transaction = this.transactionService.addTransaction({
      date: new Date().toISOString(),
      items: currentItems,
      total: total
    });

    for (let i = 0; i < currentItems.length; i++) {
      const product = this.productService.getProductById(currentItems[i].productId);
      if (product) {
        product.stock = product.stock - currentItems[i].qty;
      }
    }

    this.cartService.clearCart();
    this.refresh();
    this.message = '';
    this.lastId = transaction.id;
    this.lastTotal = total;
    this.showSuccess = true;
  }
}