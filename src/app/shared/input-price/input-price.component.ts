import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input-price',
  templateUrl: './input-price.component.html',
  styleUrls: ['./input-price.component.css']
})
export class InputPriceComponent implements OnInit, OnChanges {

  show = false;
  currency: string = "USD";

  @Input() price: number | undefined;
  @Input() editMode: boolean = false;
  @Output() changePrice: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.price);
    if (changes['price'] != undefined) {
      (<HTMLInputElement>document.getElementById('amount-price')).value = changes['price'].currentValue;
    }
  }

  ngOnInit(): void {
    console.log(this.price);
    if (this.price != undefined) {
      (<HTMLInputElement>document.getElementById('amount-price')).value = this.price.toString();
    }
  }

  changeCurrency(selected: string) {
    this.currency = selected;
    this.show = !this.show;
  }

  consoleit(event: Event) {
    this.changePrice.emit((<HTMLInputElement>(event.target)).value);
  }

}
