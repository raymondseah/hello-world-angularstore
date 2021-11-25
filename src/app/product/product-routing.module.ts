import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { AllproductsComponent } from './components/allproducts/allproducts.component';
import { CartComponent } from './components/cart/cart.component';
import { CreateproductComponent } from './components/createproduct/createproduct.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateproductComponent,
    canActivate: [AuthGuardService],
  },
  { path: '', component: AllproductsComponent },
  {
    path: 'products/:id',
    component: ProductdetailsComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'cart', component: CartComponent,
  canActivate: [AuthGuardService],},
  { path: '**', component: PageNotFoundComponent },

  // { path: 'products/:id', component: ProductdetailsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
