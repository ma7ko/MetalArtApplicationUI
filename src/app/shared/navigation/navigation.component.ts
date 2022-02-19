import { Component, OnInit, Input } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  faUser = faUser;
  @Input() homeMenuLink: any;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(event: any) {
    console.log(event);
    document.getElementsByClassName('navbar-collapse')[0].classList.toggle('collapse');
  }

}
