import { Component } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../services/cart';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page {
  products: Product[] = [];
  searchTerm = '';
  cartCount = 0;
  message = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ionViewWillEnter(): void {
    this.loadProducts();
  }

  get filteredProducts(): Product[] {
    const keyword = this.searchTerm.trim().toLowerCase();

    if (!keyword) {
      return this.products;
    }

    return this.products.filter(product =>
      product.name.toLowerCase().includes(keyword)
      || product.category.toLowerCase().includes(keyword)
    );
  }

  addToCart(product: Product): void {
    const added = this.cartService.addProduct(product);

    this.message = added
      ? `${product.name} ditambahkan ke keranjang.`
      : `Stok ${product.name} habis atau sudah mencapai batas stok.`;

    this.cartCount = this.cartService.getItemCount();
  }

  private loadProducts(): void {
    this.products = this.productService.getProducts();
    this.cartCount = this.cartService.getItemCount();
  }
}