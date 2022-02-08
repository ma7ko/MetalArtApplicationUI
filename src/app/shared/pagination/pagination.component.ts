import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentAmount: number = 0;
  @Input() totalCount: number = 0;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  page:number = 0;
  arrayHelper: Array<number> = new Array<number>();

  constructor() { }

  ngOnInit(): void {

    for (let i = 0; i < this.currentAmount; i++)
    {
      this.arrayHelper.push(i);
    }
    console.log(this.arrayHelper);
  }

  changePage(event: Event) {
    let id = (<HTMLElement>event.target).getAttribute("data-id");
    if (id) {
      this.page = parseInt(id);
      this.pageChanged.emit(parseInt(id));
    }
  }

}
