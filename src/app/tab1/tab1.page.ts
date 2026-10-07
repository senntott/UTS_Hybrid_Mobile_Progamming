import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product';

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.totalProduk = this.productService.getTotalProducts();
  }
}