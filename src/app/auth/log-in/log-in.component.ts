import { Component, OnInit } from '@angular/core';
import { faFeather } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  faFeather = faFeather;
  constructor() { }

  ngOnInit(): void {
  }

}
