import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dimension } from 'src/app/service/products/request/product-request';

@Component({
  selector: 'app-input-dimension',
  templateUrl: './input-dimension.component.html',
  styleUrls: ['./input-dimension.component.css']
})
export class InputDimensionComponent implements OnInit {

  @Input() previewMode: boolean = false;
  @Input() dimension: Dimension = new Dimension();
  @Output() changedDimensions: EventEmitter<Dimension> = new EventEmitter<Dimension>();
  dimensions: Dimension = new Dimension();
  metrics: string = "mm";
  constructor() { }

  ngOnInit(): void {
    if (this.previewMode) {
      document.querySelectorAll('.field').forEach((element: Element) => {
        let el = <HTMLInputElement>element;
        el.disabled = true;
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
