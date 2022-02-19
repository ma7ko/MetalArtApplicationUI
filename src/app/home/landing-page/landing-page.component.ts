import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faPaperPlane, faClock, faInfo } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, AfterViewInit {

  faIcon = faPaperPlane as IconProp;
  faClock = faClock as IconProp;
  faInfo = faInfo as IconProp;
  draw: boolean = false;
  constructor() { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

}
