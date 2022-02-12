import { Component, OnInit } from '@angular/core';
import { ProductResponse } from 'src/app/service/products/request/product-request';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items: any;
  username: string = '';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let user = localStorage.getItem('userKey')?.toString();
    if (user != undefined) {
      this.username = user;
      this.userService.getUserProducts(this.username).subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    }
  }

}
