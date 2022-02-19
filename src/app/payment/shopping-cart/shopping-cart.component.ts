import { Component, OnInit } from '@angular/core';
import { ProductResponse } from 'src/app/service/products/request/product-request';
import { ProductToCartRequest } from 'src/app/service/user/request/user-request';
import { UserService } from 'src/app/service/user/user.service';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items: any;
  username: string = '';
  cartArray: Array<number> = [1,2,3];
  totalPrice: string = '0';
  products: any;
  faCart = faCartArrowDown as IconProp;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let user = localStorage.getItem('userKey')?.toString();
    if (user != undefined) {
      this.username = user;
      this.getProducts();
    }
  }

  getProducts() {
    this.userService.getUserProducts(this.username).subscribe((response) => {
      this.products = response;
      this.totalPrice = Object.values(this.products).map((obj: any) => obj.price).reduce((acc:any, val:any) => acc + val, 0);
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  removeProduct(product: any) {
    this.products = undefined;
    let user = localStorage.getItem('userKey')?.toString();
    if (user != undefined) {
      let request = new ProductToCartRequest();
      request.productId = product.id;
      request.username = user;
      this.userService.addProductToUserCart(request).subscribe((response) => {
        this.getProducts();
      }, (error) => {
        console.log(error);
      })
    }
  }

  /*getProductsInCart() {
    let user = localStorage.getItem('userKey');
    if (user) {
    this.userService.getUserProducts(user).subscribe((response) => {
      this.productsInCart = response;
      this.addingToCart = false;
      if (this.productsInCart.filter((p: any) => {return p.id == this.product.id;}).length > 0)
        this.addedToCart = true;
      else 
        this.addedToCart = false;
      console.log(this.addedToCart);
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }
  }
*/
}
