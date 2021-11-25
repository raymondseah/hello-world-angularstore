// @ts-nocheck

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';
import { stat } from 'fs';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css'],
})
export class AllproductsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'productName',
    'productDescription',
    'productPrice',
    'pictureUrl',
    'actions',
  ];
  selectedProduct: IProduct | undefined;
  products: IProduct[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  // LoginStatus$: Observable<boolean>;
  LoggedIn: Boolean;

  ngOnInit(): void {
    this.productService
      .getproductlist()
      .subscribe((products) => (this.products = products));

    // this.checkStatus();
    this.IsLoggedIn();
  }

  async IsLoggedIn() {
    let status = await this.authService.checkLoginStatus();
    console.log(status)
    this.LoggedIn = status;
  }




  checkStatus() {
    let status = this.authService.checkLoginStatus();
    console.log(status);
    this.LoginStatus$ = this.authService.isLoggesIn;
    console.log(this.LoginStatus$);
  }

  onSelect(product: IProduct): void {
    this.selectedProduct = product;
    console.log('Edit button pressed!', product.id);
    this.router.navigateByUrl('/products/' + product.id);
  }

  handleAddToCart(product: IProduct) {
    // console.log("clicked")
    var quantity = { Quantity: 1 };
    // product["Quantity"] = "1";
    var obj = { ...product, ...quantity };
    // console.log(obj);
    this.cartService.addtoCart(obj);
  }

  onDeleteProduct(product: IProduct) {
    console.log('Edit button pressed!', product.id);
  }

  onUpdateProduct(product: IProduct) {
    console.log('Edit button pressed!', product.id);
  }
}
