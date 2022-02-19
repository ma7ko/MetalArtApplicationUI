import { Component, Input, OnInit } from '@angular/core';
import { faEraser, faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  faEraser = faEraser;
  @Input() statusCode: number = 404;

  constructor() { }

  ngOnInit(): void {
  }

}
