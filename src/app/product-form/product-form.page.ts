import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: false
})
export class ProductFormPage implements OnInit {
  form: FormGroup;
  isEditMode = false;
  private productId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', Validators.required],
      buyPrice: [
        null,
        [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]
      ],
      sellPrice: [
        null,
        [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]+$/)]
      ],
      stock: [
        0,
        [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+$/)]
      ],
      image: ['']
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      return;
    }

    const product = this.productService.getProductById(id);

    if (!product) {
      return;
    }

    this.isEditMode = true;
    this.productId = id;
    this.form.patchValue(product);
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const productData = {
      name: String(value.name).trim(),
      category: String(value.category).trim(),
      buyPrice: Number(value.buyPrice),
      sellPrice: Number(value.sellPrice),
      stock: Number(value.stock),
      image: String(value.image ?? '').trim() || undefined
    };

    if (this.isEditMode && this.productId !== undefined) {
      const existingProduct =
        this.productService.getProductById(this.productId);

      if (existingProduct) {
        this.productService.updateProduct({
          ...existingProduct,
          ...productData
        });
      }
    } else {
      this.productService.addProduct(productData);
    }

    void this.router.navigateByUrl('/tabs/tab2');
  }
}