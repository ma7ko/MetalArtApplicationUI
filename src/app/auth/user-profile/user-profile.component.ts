import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let user = localStorage.getItem('userKey');
    this.lastLogIn = localStorage.getItem('lastLogIn');
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
