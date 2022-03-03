import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  username: string | undefined;
  products: any;
  lastLogIn: any;

  constructor(private userService: UserService, private translateService: TranslateService) { 
    this.translateService.setDefaultLang('mk');
    this.translateService.use('mk');
  }

  ngOnInit(): void {
    let user = localStorage.getItem('userKey');
    this.lastLogIn = localStorage.getItem('lastLogIn');
    this.lastLogIn = this.lastLogIn.replace("Mon", "Пон");
    this.lastLogIn = this.lastLogIn.replace("Tue", "Вто");
    this.lastLogIn = this.lastLogIn.replace("Wed", "Сре");
    this.lastLogIn = this.lastLogIn.replace("Thu", "Чет");
    this.lastLogIn = this.lastLogIn.replace("Fri", "Пет");
    this.lastLogIn = this.lastLogIn.replace("Sat", "Саб");
    this.lastLogIn = this.lastLogIn.replace("Sun", "Нед");
    this.lastLogIn = this.lastLogIn.replace("Jan", "Јан");
    this.lastLogIn = this.lastLogIn.replace("Feb", "Феб");
    this.lastLogIn = this.lastLogIn.replace("Mar", "Мар");
    this.lastLogIn = this.lastLogIn.replace("Apr", "Апр");
    this.lastLogIn = this.lastLogIn.replace("May", "Мај");
    this.lastLogIn = this.lastLogIn.replace("Jun", "Јун");
    this.lastLogIn = this.lastLogIn.replace("Jul", "Јул");
    this.lastLogIn = this.lastLogIn.replace("Aug", "Авг");
    this.lastLogIn = this.lastLogIn.replace("Sep", "Сеп");
    this.lastLogIn = this.lastLogIn.replace("Oct", "Окт");
    this.lastLogIn = this.lastLogIn.replace("Nov", "Ное");
    this.lastLogIn = this.lastLogIn.replace("Dec", "Дек");
    this.username = user?.toString();
    this.getProducts();
  }

  getProducts() {
    this.userService.getUserProducts(this.username).subscribe((response) => {
      this.products = response;
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  connectToDate(event: Event) {
    let el = (<HTMLElement>event.target).nextElementSibling?.firstElementChild?.firstElementChild;
    console.log(el);
    if (el) 
      (<HTMLElement>el).style.strokeDashoffset = "0px";
    setTimeout(function() { (<HTMLElement>document.querySelector('.text-desc')).style.display="block"; }, 1200);
  }

}
