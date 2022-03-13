import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AmountFormControl } from 'src/app/model/amount/amount-form-control';
import { PositiveNumberFormControl } from 'src/app/model/positive-number-only/positive-number-form-control';

@Component({
  selector: 'app-input-price',
  templateUrl: './input-price.component.html',
  styleUrls: ['./input-price.component.css']
})
export class InputPriceComponent implements OnInit, OnChanges {

  show = false;
  currency: string = "MKD";

  priceForm = new FormGroup({
    price: new AmountFormControl('0')
  });

  @Input() price: number | undefined;
  @Input() editMode: boolean = false;
  @Output() changePrice: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("in pirce ng changes");
    console.log(this.price);
    if (changes['price'] != undefined && changes['price'].currentValue) {
      (this.priceForm.controls['price'].setValue(changes['price'].currentValue));
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
    console.log(event);
    console.log((<HTMLInputElement>event.target).value);
    if ((<KeyboardEvent>event).key == "Backspace" && (<HTMLInputElement>(event.target)).value != "0" &&  (<HTMLInputElement>(event.target)).value.length == 1) {
      this.changePrice.emit('0');
    } else if ((<KeyboardEvent>event).key != "Backspace" && (<HTMLInputElement>(event.target)).value == "0") {
      this.changePrice.emit((<KeyboardEvent>event).key);
    } else {
      this.changePrice.emit((<HTMLInputElement>(event.target)).value + "" + (<KeyboardEvent>event).key);
    }
  }

}
