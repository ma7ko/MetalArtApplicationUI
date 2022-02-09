import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaymentRoutingModule } from './payment-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ShoppingCartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class PaymentModule { }
