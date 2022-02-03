import { Component, OnInit } from '@angular/core';
import { faPaperPlane, faClock, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  faIcon = faPaperPlane;
  faClock = faClock;
  faInfo = faInfo;
  constructor() { }

  ngOnInit(): void {
  }

}
