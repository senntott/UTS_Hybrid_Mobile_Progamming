import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product';
import { TransactionService } from '../services/transaction';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {
  totalProduk = 0;
  totalTransaksiHariIni = 0;
  produkTerlaris = 'Belum ada transaksi';

  constructor(
    private productService: ProductService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  ionViewWillEnter(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    this.totalProduk = this.productService.getProducts().length;
    this.totalTransaksiHariIni =
      this.transactionService.getTotalTransactionsToday();
    this.produkTerlaris =
      this.transactionService.getBestSellingProductToday();
  }
}