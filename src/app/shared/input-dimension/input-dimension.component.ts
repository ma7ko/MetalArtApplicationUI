import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Dimension } from 'src/app/service/products/request/product-request';

@Component({
  selector: 'app-input-dimension',
  templateUrl: './input-dimension.component.html',
  styleUrls: ['./input-dimension.component.css']
})
export class InputDimensionComponent implements OnInit, OnChanges {

  @Input() previewMode: boolean = false;
  @Input() dimension: Dimension = new Dimension();
  @Input() editMode: boolean = false;
  @Output() changedDimensions: EventEmitter<Dimension> = new EventEmitter<Dimension>();
  dimensions: Dimension = new Dimension();
  metrics: string = "mm";
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log ("here in ng changes");
    console.log(this.dimension);
    if (changes['dimension'] != undefined) {
      this.dimension = changes['dimension'].currentValue;
    }
    console.log(this.dimension);
  }

  ngOnInit(): void {
    if (this.previewMode) {
      document.querySelectorAll('.field').forEach((element: Element) => {
        let el = <HTMLInputElement>element;
        el.disabled = true;
        el.style.opacity = "0.8";
      });
    }
  }

  radioDim(event: Event) {
    let radio = <HTMLInputElement>(<HTMLInputElement>event.target)?.firstChild;
    document.querySelectorAll('.radio-dim').forEach(element => {
      element.setAttribute("id", '');
    });
    this.metrics = radio.value;
    radio.checked = true;
    radio.parentElement?.setAttribute("id", "checkbox-active");
  }

  dimensionChanged(event: Event) {
    let inputElement = <HTMLInputElement>event.target;

    if (inputElement.name == "width") {
      this.dimensions.width = parseFloat(inputElement.value);
    } else if (inputElement.name == "height") {
      this.dimensions.height = parseFloat(inputElement.value);
    } else {
      this.dimensions.depth = parseFloat(inputElement.value);
    }

    this.changedDimensions.emit(this.dimensions);
  }

}
