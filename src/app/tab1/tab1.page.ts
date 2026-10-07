import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product';
import { TransactionService } from '../services/transaction';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit, OnDestroy {
  totalProduk = 0;
  totalTransaksiHariIni = 0;
  produkTerlaris = 'Belum ada transaksi';

  private productSubscription?: Subscription;
  private transactionSubscription?: Subscription;

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productSubscription =
      this.productService.products$.subscribe(products => {
        this.totalProduk = products.length;
        this.changeDetector.markForCheck();
      });

    this.transactionSubscription =
      this.transactionService.transactions$.subscribe(() => {
        this.loadTransactionSummary();
        this.changeDetector.markForCheck();
      });
  }

  ionViewWillEnter(): void {
    this.totalProduk = this.productService.getProducts().length;
    this.loadTransactionSummary();
    this.changeDetector.markForCheck();
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
    this.transactionSubscription?.unsubscribe();
  }

  private loadTransactionSummary(): void {
    this.totalTransaksiHariIni =
      this.transactionService.getTotalTransactionsToday();
    this.produkTerlaris =
      this.transactionService.getBestSellingProductToday();
  }
}
