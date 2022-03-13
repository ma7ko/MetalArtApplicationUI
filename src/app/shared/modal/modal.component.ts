import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() showModal: boolean = false;
  @Input() showCancelButton: boolean = true;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showModal'] && changes['showModal'].currentValue) {
      setTimeout(() => {(<HTMLElement>document.querySelector('.modal-custom')).style.maxHeight = "500px";}, 50);
    }
  }

  removeMaxHeight() {
    (<HTMLElement>document.querySelector('.modal-custom')).style.maxHeight = "0px";
  }

  ngOnInit(): void {
  }

}
