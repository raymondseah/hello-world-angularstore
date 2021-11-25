import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor() {}
  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product: any) {
    // console.log(this.cartItemList);
    const found = this.cartItemList.some(
      (el: { id: any }) => el.id === product.id
    );
    console.log(found);

    if (!found) {
      console.log('not in cart');
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
      // console.log(this.cartItemList);
    } else (
      alert("already in cart")
    )
    console.log(this.cartItemList)
  }

  //   addtoCart(product: any) {
  //     console.log('not in cart');
  //     this.cartItemList.push(product);
  //     this.productList.next(this.cartItemList);
  //     this.getTotalPrice();
  //     console.log(this.cartItemList);
  // }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      // console.log(a.Quantity * a.productPrice);
      let sumOfAllRow = a.Quantity * a.productPrice;
      grandTotal += sumOfAllRow;
    });
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  plus(product: any, num: number) {
    product.Quantity += num;

    if (product.Quantity <= 0) {
      // product.del(product);
      this.cartItemList.map((a: any, index: any) => {
        if (product.id === a.id) {
          this.cartItemList.splice(index, 1);
        }
      });
      this.productList.next(this.cartItemList);
    }
  }
}
