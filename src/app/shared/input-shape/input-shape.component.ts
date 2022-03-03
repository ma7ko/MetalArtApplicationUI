import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input-shape',
  templateUrl: './input-shape.component.html',
  styleUrls: ['./input-shape.component.css']
})
export class InputShapeComponent implements OnInit {

  @Input() shape: number | undefined;
  @Output() selectedShape: EventEmitter<string> = new EventEmitter<string>();
  showDropdown: boolean = false;
  selectedValue: string = "rounded";

  constructor(private translateService: TranslateService) { 
    this.translateService.setDefaultLang('mk');
    this.translateService.use('mk');
  }

  ngOnInit(): void {
    if (this.shape != undefined) {
      document.querySelectorAll(".dropdown-item").forEach((element: Element) => {
        let dataId = (<HTMLElement> element).getAttribute('data-id');
        if (dataId == this.shape?.toString())
          (<HTMLElement>element).click();
      });
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
    event.stopPropagation();
  }

  toggleDropdown(event: Event) {
    this.showDropdown = !this.showDropdown;
    setTimeout(function() { (<HTMLElement>document.querySelector('.menu-shape')).click();
    (<HTMLElement>document.querySelector('.menu-shape')).focus();
    (<HTMLElement>(<HTMLElement>event.target).nextElementSibling)?.click();
    console.log(document.activeElement == (<HTMLElement>document.querySelector('.menu-shape')));
    console.log((<HTMLElement>document.querySelector('.menu-shape'))); }, 100);
  }

  focusOnDropdown(event: Event) {
    (<HTMLElement>document.querySelector('.menu-shape')).click();
    (<HTMLElement>document.querySelector('.menu-shape')).focus();
    (<HTMLElement>(<HTMLElement>event.target).nextElementSibling)?.click();
    console.log(document.activeElement == (<HTMLElement>document.querySelector('.menu-shape')));
  }

  checkValueChanged(event: Event) {
    this.showDropdown = false;
    event.stopPropagation();
  }

  focusIn(event: Event) {
    this.showDropdown = true;
  }

}
