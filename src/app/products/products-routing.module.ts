import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth/auth.guard';
import { RoleGuard } from '../guard/role/role.guard';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsEditComponent } from './products-edit/products-edit.component';
import { ProductsHomeComponent } from './products-home/products-home.component';

const routes: Routes = [
  { path: '', component: ProductsHomeComponent },
  { path: 'create', component: ProductsCreateComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: ':id/edit', component: ProductsEditComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: ':id/details', component: ProductsDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
