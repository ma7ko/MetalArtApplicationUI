import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements OnInit, OnChanges {

  @Input() product: any = null;
  @Input() editMode: boolean = false;
  @Input() placeholderActive: boolean = false;
  @Input() showPrice: boolean = false;

  @Output() checkboxTicked: EventEmitter<string> = new EventEmitter<string>();
  imageFile: Blob | undefined;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showPrice']) {
      this.showPrice = changes['showPrice'].currentValue;
    }
  }

  ngOnInit(): void {
  }

  ticked(event: Event) {
   this.checkboxTicked.emit(((<HTMLInputElement>event?.target)?.parentElement?.parentElement?.getAttribute('data-id')?.toString()));
  }



}
