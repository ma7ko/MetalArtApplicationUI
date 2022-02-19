import { Component, OnInit } from '@angular/core';
import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MetalArtApplication';
  faUser = faUser as IconProp;
  faShoppingCart = faShoppingCart as IconProp;
  faSignOut = faSignOutAlt as IconProp;
  loggedIn: boolean = false;

  ngOnInit(): void {
    let userInfo = localStorage.getItem('authKey');
    if (userInfo != null)
      this.loggedIn = true;
  }

  logOut() {
    localStorage.removeItem('authKey');
    localStorage.removeItem('userKey');
    localStorage.removeItem('roleKey');
    location.reload();
  }
}
