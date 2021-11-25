import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { CreateproductComponent } from './components/createproduct/createproduct.component';
import { FormsModule } from '@angular/forms';
import { AllproductsComponent } from './components/allproducts/allproducts.component';
import { MatTableModule } from '@angular/material/table';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    CreateproductComponent,
    AllproductsComponent,
    ProductdetailsComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    MatTableModule
  ],
  exports:[
    CreateproductComponent,
    AllproductsComponent,
    ProductdetailsComponent,
  ]
})
export class ProductModule { }
