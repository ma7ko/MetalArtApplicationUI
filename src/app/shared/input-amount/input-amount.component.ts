import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.css']
})
export class InputAmountComponent implements OnInit, OnChanges {

  arrowUp = faPlus;
  arrowDown = faMinus;

  @Input() amount: any;
  @Output() amountChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    (<HTMLInputElement>document.getElementById('amount-field')).value = changes['amount'].currentValue;
  }

  ngOnInit(): void {
    console.log(this.amount);
    if (this.amount != undefined) {
      (<HTMLInputElement>document.getElementById('amount-field')).value = this.amount.toString();
    }
  }

  changeAmount(increase: boolean) {
    let amount = <HTMLInputElement>document.getElementById('amount-field');
    let newValue: number = increase ? parseInt(amount.value) + 1 : parseInt(amount.value) - 1;
    amount.value = newValue.toString();
    this.amountChanged.emit(newValue);
  }

}
