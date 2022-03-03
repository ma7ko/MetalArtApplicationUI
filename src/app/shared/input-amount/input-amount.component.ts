import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FormGroup } from '@angular/forms';
import { PositiveNumberFormControl } from 'src/app/model/positive-number-only/positive-number-form-control';
import { AmountFormControl } from 'src/app/model/amount/amount-form-control';

@Component({
  selector: 'app-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.css']
})
export class InputAmountComponent implements OnInit, OnChanges {

  arrowUp = faPlus as IconProp;
  arrowDown = faMinus as IconProp;

  amountForm = new FormGroup({
    amount: new AmountFormControl(0)
  });

  @Input() amount: any;
  @Output() amountChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['amount']) {
      if (changes['amount'].currentValue)
        this.amountForm.controls['amount'].setValue(changes['amount'].currentValue);
    }
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
    this.amountForm.controls['amount'].patchValue(newValue.toString());
    this.amountChanged.emit(newValue);
  }

}
