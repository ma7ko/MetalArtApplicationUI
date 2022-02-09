import { Component, OnInit } from '@angular/core';
import { ProductResponse } from 'src/app/service/products/request/product-request';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items: any;
  constructor() { }

  ngOnInit(): void {
  }

}
