import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-price-tag',
  templateUrl: './input-price-tag.component.html',
  styleUrls: ['./input-price-tag.component.css']
})
export class InputPriceTagComponent implements OnInit {

  @Output() selectChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  currencyChanged(event: Event) {
    this.selectChanged.emit((<HTMLSelectElement>event.target).selectedIndex);
  }

}
