import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-placeholder',
  templateUrl: './cart-placeholder.component.html',
  styleUrls: ['./cart-placeholder.component.css']
})
export class CartPlaceholderComponent implements OnInit {

  @Input() product: any;
  @Output() productRemove: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  removeProduct() {
    this.productRemove.emit(this.product);
  }
}
