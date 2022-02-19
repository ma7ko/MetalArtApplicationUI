import { Component, Input, OnInit } from '@angular/core';
import { faEraser, faBan } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  faEraser = faEraser as IconProp;
  @Input() statusCode: number = 404;

  constructor() { }

  ngOnInit(): void {
  }

}
