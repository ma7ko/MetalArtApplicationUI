import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faPaperPlane, faClock, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, AfterViewInit {

  faIcon = faPaperPlane;
  faClock = faClock;
  faInfo = faInfo;
  draw: boolean = false;
  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

}
