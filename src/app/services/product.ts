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
      image: 'data:image/jpeg;base64,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'
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
      image: 'data:image/jpeg;base64,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'
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