import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly storageKey = 'simobile-products';

  private readonly initialProducts: Product[] = [
    {
      id: 1,
      name: 'Beras Ramos 5 kg',
      category: 'Sembako',
      buyPrice: 65000,
      sellPrice: 72000,
      stock: 20,
      image: 'https://image.astronauts.cloud/product-images/2024/4/LumbungPadiBerasIndonesia1_a3ba5dc3-79f9-4cf4-a7e2-588ad7235a68_900x900.png'
    },
    {
      id: 2,
      name: 'Gula Pasir 1 kg',
      category: 'Sembako',
      buyPrice: 14500,
      sellPrice: 17000,
      stock: 35,
      image: 'https://cdn.ralali.id/assets/img/Libraries/Gula-Merk-Manis-Kita-1kg_frumGRBp7Io8ZMmn_1591770384.png'
    },
    {
      id: 3,
      name: 'Minyak Goreng 1 L',
      category: 'Sembako',
      buyPrice: 16000,
      sellPrice: 19000,
      stock: 24,
      image: 'https://marilenminimart.com/cdn/shop/products/bimoli_bimoli-minyak-goreng--1-l-_full02.jpg?v=1627706843'
    },
    {
      id: 4,
      name: 'Mi Instan',
      category: 'Makanan',
      buyPrice: 2500,
      sellPrice: 3500,
      stock: 60,
      image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/105/MTA-2688873/indofood_indofood-mie-goreng-aceh-mie-instan_full04.jpg'
    },
    {
      id: 5,
      name: 'Telur 1 kg',
      category: 'Sembako',
      buyPrice: 26000,
      sellPrice: 30000,
      stock: 18,
      image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/catalog-image/108/MTA-180992942/tidak_ada_merk_telur_ayam_negri_10_butir_pack_full10_ej3whf48.jpg'
    },
    {
      id: 6,
      name: 'Kopi Sachet',
      category: 'Minuman',
      buyPrice: 1200,
      sellPrice: 2000,
      stock: 50,
      image: 'https://www.nescafe.com/id/sites/default/files/2025-01/nescafe_classic_sashet_960x960px.png'
    },
    {
      id: 7,
      name: 'Teh Celup',
      category: 'Minuman',
      buyPrice: 7000,
      sellPrice: 9000,
      stock: 15,
      image: 'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/107/MTA-96823609/no-brand_teh-sariwangi-box-isi25_full01.jpg'
    },
    {
      id: 8,
      name: 'Susu UHT 1 L',
      category: 'Minuman',
      buyPrice: 17000,
      sellPrice: 21000,
      stock: 12,
      image: 'https://yoline.co.id/media/products/ProductUltramilkfullcream1000ml.jpg'
    },
    {
      id: 9,
      name: 'Sabun Mandi',
      category: 'Perawatan',
      buyPrice: 3500,
      sellPrice: 5000,
      stock: 0,
      image: 'https://c.alfagift.id/product/1/1_A12680808575_20250904170314977_base.png'
    },
    {
      id: 10,
      name: 'Air Mineral 600 ml',
      category: 'Minuman',
      buyPrice: 2500,
      sellPrice: 4000,
      stock: 30,
      image: 'https://c.alfagift.id/product/1/1_A12460003260_20260518134546715_base.png'
    }
  ];

  private readonly productsSubject =
    new BehaviorSubject<Product[]>([]);

  readonly products$ = this.productsSubject.asObservable();

  constructor() {
    this.productsSubject.next(this.loadProducts());
  }

  getProducts(): Product[] {
    return this.loadProducts().map(product => ({ ...product }));
  }

  getProductById(id: number): Product | undefined {
    const product = this.loadProducts().find(item => item.id === id);
    return product ? { ...product } : undefined;
  }

  getTotalProducts(): number {
    return this.loadProducts().length;
  }

  addProduct(product: Omit<Product, 'id'>): Product {
    const products = this.loadProducts();
    const nextId = products.length > 0
      ? Math.max(...products.map(item => item.id)) + 1
      : 1;

    const newProduct: Product = { ...product, id: nextId };
    products.push(newProduct);
    this.saveProducts(products);

    return { ...newProduct };
  }

  updateProduct(updatedProduct: Product): boolean {
    const products = this.loadProducts();
    const index = products.findIndex(item => item.id === updatedProduct.id);

    if (index === -1) {
      return false;
    }

    products[index] = { ...updatedProduct };
    this.saveProducts(products);
    return true;
  }

  deleteProduct(id: number): boolean {
    const products = this.loadProducts();
    const filteredProducts = products.filter(item => item.id !== id);

    if (filteredProducts.length === products.length) {
      return false;
    }

    this.saveProducts(filteredProducts);
    return true;
  }

  private loadProducts(): Product[] {
    const savedProducts = localStorage.getItem(this.storageKey);

    if (savedProducts) {
      try {
        const parsedProducts: unknown = JSON.parse(savedProducts);

        if (Array.isArray(parsedProducts)) {
          return (parsedProducts as Product[]).map(product => {
            const defaultProduct = this.initialProducts.find(
              item => item.id === product.id
            );

            return {
              ...product,
              image: defaultProduct?.image || product.image
            };
          });
        }
      } catch {
        // Data tidak valid akan diganti dengan data awal.
      }
    }

    this.saveProducts(this.initialProducts);
    return this.initialProducts.map(product => ({ ...product }));
  }

  private saveProducts(products: Product[]): void {
    const copy = products.map(product => ({ ...product }));

    localStorage.setItem(this.storageKey, JSON.stringify(copy));
    this.productsSubject.next(copy);
  }
}