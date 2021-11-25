import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})


export class ProductdetailsComponent implements OnInit {


  // @Input()
  // product!: IProduct;

  selectedProduct!: IProduct;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private router : Router, 
  ) { }


  ngOnInit(): void {
    let id  = + this.route.snapshot.params['id'];

   this.productService.getProductById(id).subscribe((product) => this.selectedProduct = product);
   this.productService.getProductById(id).subscribe((product) => console.log(product));

  //  this.productService.getProductById(id).subscribe(product => console.log(product));

  }

}
