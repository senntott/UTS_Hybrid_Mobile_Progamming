import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AlertController } from '@ionic/angular/lazy';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import { CartService } from '../services/cart';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false
})
export class Tab2Page implements OnInit, OnDestroy {
  products: Product[] = [];
  searchTerm = '';
  cartCount = 0;
  message = '';

  private productSubscription?: Subscription;
  private cartSubscription?: Subscription;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private alertController: AlertController,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.productSubscription =
      this.productService.products$.subscribe(products => {
        this.products = products;
        this.changeDetector.markForCheck();
      });

    this.cartSubscription =
      this.cartService.items$.subscribe(items => {
        this.cartCount = items.reduce((count, item) => count + item.qty, 0);
        this.changeDetector.markForCheck();
      });
  }

  ionViewWillEnter(): void {
    this.products = this.productService.getProducts();
    this.cartCount = this.cartService.getItemCount();
    this.message = '';
    this.changeDetector.markForCheck();
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
    this.cartSubscription?.unsubscribe();
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

  onProductImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.onerror = null;
    image.src = 'https://placehold.co/120x120?text=Gambar+Tidak+Tersedia';
  }

  addToCart(product: Product): void {
    const added = this.cartService.addProduct(product);

    this.message = added
      ? `${product.name} ditambahkan ke keranjang.`
      : `Stok ${product.name} habis atau sudah mencapai batas stok.`;
  }

  async confirmDelete(product: Product): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Hapus Produk?',
      message: `Yakin ingin menghapus produk "${product.name}"?`,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          role: 'destructive'
        }
      ],
      backdropDismiss: false
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role !== 'destructive') {
      return;
    }

    const deleted = this.productService.deleteProduct(product.id);

    this.message = deleted
      ? `${product.name} berhasil dihapus.`
      : 'Produk gagal dihapus.';

    this.changeDetector.markForCheck();
  }
}