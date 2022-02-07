import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsHomeComponent } from './products-home/products-home.component';

const routes: Routes = [
  { path: '', component: ProductsHomeComponent },
  { path: 'create', component: ProductsCreateComponent },
  { path: ':id/details', component: ProductsDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
