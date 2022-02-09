import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements OnInit {

  @Input() product: any = null;
  @Input() editMode: boolean = false;
  @Input() placeholderActive: boolean = false;

  @Output() checkboxTicked: EventEmitter<string> = new EventEmitter<string>();
  imageFile: Blob | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  ticked(event: Event) {
   this.checkboxTicked.emit(((<HTMLInputElement>event?.target)?.parentElement?.parentElement?.getAttribute('data-id')?.toString()));
  }



}
