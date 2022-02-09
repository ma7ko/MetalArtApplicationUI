import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsHomeComponent } from './products-home/products-home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PricePipe } from '../pipe/price/price.pipe';
import { ProductsEditComponent } from './products-edit/products-edit.component';


@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProductsDetailsComponent,
    ProductsCreateComponent,
    ProductsEditComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ]
})
export class ProductsModule { }
