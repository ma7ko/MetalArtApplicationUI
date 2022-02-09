import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() currentAmount: number = 0;
  @Input() totalCount: number = 0;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  page:number = 0;
  arrayHelper: Array<number> = new Array<number>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentAmount']) {
      this.currentAmount = changes['currentAmount'].currentValue;
    }
    if (changes['totalCount']) {
      this.totalCount = changes['totalCount'].currentValue;
    }
    this.initArray();
  }

  ngOnInit(): void {

    console.log(this.totalCount);
    console.log(this.currentAmount);
    this.initArray();
  }

  initArray() {
    for (let i = 0; i <= (this.totalCount / this.currentAmount); i++)
    {
      this.arrayHelper.push(i);
    }
    console.log(this.arrayHelper);
  }

  changePage(event: Event) {
    let id = (<HTMLElement>event.target).getAttribute("id");
    if (id) {
      this.page = parseInt(id);
      this.pageChanged.emit(parseInt(id));
    }
  }

}
