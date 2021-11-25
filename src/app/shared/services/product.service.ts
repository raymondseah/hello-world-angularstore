import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, flatMap, map } from 'rxjs/operators';
import { IProduct } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productUrl = 'http://localhost:5000/api/';
  // products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  createproduct(model: any) {
    // let headers = new HttpHeaders().set(
    //   'Authorization',
    //   'Bearer ' + this.token
    // );
    // let options = { headers: headers, withCredentials: true };
    let options = { withCredentials: true };
    return this.http
      .post(this.productUrl + 'createproduct', model, options)
      .pipe(
        map((response: any) => {
          const data = response;
          console.log(data);
        })
      );
  }

  getproductlist() {
    let options = { withCredentials: true };
    return this.http.get<IProduct[]>(this.productUrl + 'getproducts', options);
  }


  getProductById(id: number){
    const url = `${this.productUrl}getproducts/${id}`;

    let options = { withCredentials: true };
    return this.http.get<IProduct>(url, options);
  }
}
