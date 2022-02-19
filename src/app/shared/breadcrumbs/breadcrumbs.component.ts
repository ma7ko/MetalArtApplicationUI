import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit{

  angleRight = faAngleRight as IconProp;

  constructor() { }

  ngOnInit(): void {
  }

}
