import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
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
export class CartPage implements OnInit, OnDestroy {
  items: CartItem[] = [];
  total = 0;
  message = '';

  private cartSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private transactionService: TransactionService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cartSubscription =
      this.cartService.items$.subscribe(items => {
        this.items = items;
        this.total = items.reduce(
          (sum, item) => sum + item.price * item.qty,
          0
        );
        this.changeDetector.markForCheck();
      });
  }

  ionViewWillEnter(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.message = '';
    this.changeDetector.markForCheck();
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  changeQuantity(item: CartItem, quantity: number): void {
    const updated = this.cartService.updateQuantity(item.productId, quantity);

    this.message = updated
      ? ''
      : 'Jumlah melebihi stok produk yang tersedia.';
  }

  removeItem(item: CartItem): void {
    this.cartService.removeProduct(item.productId);
    this.message = '';
  }

  checkout(): void {
    const currentItems = this.cartService.getItems();

    if (currentItems.length === 0) {
      this.message = 'Keranjang masih kosong.';
      return;
    }

    for (const item of currentItems) {
      const product = this.productService.getProductById(item.productId);

      if (!product || product.stock < item.qty) {
        this.message =
          `Stok ${item.name} tidak mencukupi. Periksa kembali keranjang.`;
        return;
      }
    }

    const total = currentItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const transaction = this.transactionService.addTransaction({
      date: new Date().toISOString(),
      items: currentItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        qty: item.qty
      })),
      total
    });

    for (const item of currentItems) {
      const product = this.productService.getProductById(item.productId);

      if (product) {
        this.productService.updateProduct({
          ...product,
          stock: product.stock - item.qty
        });
      }
    }

    this.cartService.clearCart();
    this.message = `Transaksi #${transaction.id} berhasil disimpan.`;
  }
}