import { Component, OnInit } from '@angular/core';
import { faUser, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './service/user/user.service';
import { AuthService } from './service/auth/auth.service';

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

  constructor(private translateService: TranslateService, private authService: AuthService) {
    this.translateService.setDefaultLang('mk');
    this.translateService.use('mk');
  }

  ngOnInit(): void {
    let userInfo = localStorage.getItem('authKey');
    if (userInfo != null) {
      if (this.authService.isLoggedIn()) {
        this.loggedIn = true;
      } else {
        localStorage.removeItem('authKey');
        localStorage.removeItem('userKey');
        localStorage.removeItem('roleKey');
        localStorage.removeItem('lastLogIn');
        this.loggedIn = false;
      }
    }
  }

  logOut() {
    this.loggedIn = false;
    localStorage.removeItem('authKey');
    localStorage.removeItem('userKey');
    localStorage.removeItem('roleKey');
    localStorage.removeItem('lastLogIn');
    location.href="/home";
  }
}
