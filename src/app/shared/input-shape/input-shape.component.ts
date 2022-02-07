import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-shape',
  templateUrl: './input-shape.component.html',
  styleUrls: ['./input-shape.component.css']
})
export class InputShapeComponent implements OnInit {

  @Output() selectedShape: EventEmitter<string> = new EventEmitter<string>();
  showDropdown: boolean = false;
  selectedValue: string = "Rounded";

  constructor() { }

  ngOnInit(): void {
  }

  shapeSelected(event: Event) {
    let shapeValue = (<HTMLElement>event?.target);
    if (shapeValue.textContent)
      this.selectedValue = shapeValue.textContent?.toString();
    let value = shapeValue.getAttribute("data-id");
    if (value != null)
      this.selectedShape.emit(value);

    this.showDropdown = false;
  }

}
