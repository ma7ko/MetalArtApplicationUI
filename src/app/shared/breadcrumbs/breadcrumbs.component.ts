import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit{

  angleRight = faAngleRight;

  constructor() { }

  ngOnInit(): void {
  }

}
