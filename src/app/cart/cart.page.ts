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
  showSuccess = false;
  lastId = 0;
  lastTotal = 0;
  alertButtons = ['Selesai'];

  private cartSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private transactionService: TransactionService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.items$.subscribe(items => {
      this.items = items.map(item => ({ ...item }));
      this.total = this.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
      this.changeDetector.markForCheck();
    });
  }

  ionViewWillEnter(): void {
    this.refresh();
    this.message = '';
    this.changeDetector.markForCheck();
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  refresh(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }

  changeQuantity(item: CartItem, quantity: number): void {
    const updated = this.cartService.updateQuantity(item.productId, quantity);

    this.message = updated
      ? ''
      : 'Jumlah melebihi stok produk yang tersedia.';

    this.refresh();
  }

  removeItem(item: CartItem): void {
    this.cartService.removeProduct(item.productId);
    this.message = '';
    this.refresh();
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
        this.message = `Stok ${item.name} tidak mencukupi.`;
        return;
      }
    }

    const total = currentItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const transaction = this.transactionService.addTransaction({
      date: new Date().toISOString(),
      items: currentItems.map(item => ({ ...item })),
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
    this.refresh();

    this.message = '';
    this.lastId = transaction.id;
    this.lastTotal = total;
    this.showSuccess = true;
    this.changeDetector.markForCheck();
  }
}