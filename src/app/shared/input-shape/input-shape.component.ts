import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-shape',
  templateUrl: './input-shape.component.html',
  styleUrls: ['./input-shape.component.css']
})
export class InputShapeComponent implements OnInit {

  @Input() shape: number | undefined;
  @Output() selectedShape: EventEmitter<string> = new EventEmitter<string>();
  showDropdown: boolean = false;
  selectedValue: string = "Rounded";

  constructor() { }

  ngOnInit(): void {
    if (this.shape != undefined) {
      document.querySelectorAll(".dropdown-item").forEach((element: Element) => {
        let dataId = (<HTMLElement> element).getAttribute('data-id');
        if (dataId == this.shape?.toString())
          (<HTMLElement>element).click();
      })
    }
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
