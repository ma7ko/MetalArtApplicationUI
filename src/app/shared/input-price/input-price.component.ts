import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-price',
  templateUrl: './input-price.component.html',
  styleUrls: ['./input-price.component.css']
})
export class InputPriceComponent implements OnInit {

  show = false;
  currency: string = "USD";

  @Output() changePrice: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  changeCurrency(selected: string) {
    this.currency = selected;
    this.show = !this.show;
  }

  consoleit(event: Event) {
    this.changePrice.emit((<HTMLInputElement>(event.target)).value);
  }

}
