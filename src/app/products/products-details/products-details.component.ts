import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products/products.service';
import { ProductResponse } from 'src/app/service/products/request/product-request';
import { faAngleRight, faCartPlus, faCheck, faListAlt, faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UserService } from 'src/app/service/user/user.service';
import { ProductToCartRequest } from 'src/app/service/user/request/user-request';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  angleRight = faAngleRight as IconProp;
  tick = faCheck as IconProp;
  cross = faTimes as IconProp;
  cart = faCartPlus as IconProp;
  editIcon = faPen as IconProp;
  deleteIcon = faTrash as IconProp;
  noSimilarProduct = faListAlt as IconProp;

  product: any;
  productId: string = '';
  currency: number = 0;
  similarProducts: any;
  placeholderArray: Array<number> = [1,2,3];
  showModal=false;
  isAdminUser: boolean = false;
  isLoggedIn: boolean = false;
  addingToCart: boolean = false;
  addedToCart: boolean = false;
  productsInCart: any;

  constructor(private productsService: ProductsService, private authService: AuthService, private userService: UserService, private router: Router, private translateService: TranslateService) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.translateService.setDefaultLang('mk');
    this.translateService.use('mk');
  }

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdminUser();
    this.isLoggedIn = this.authService.isLoggedIn();

    let prod = this.productsService.getClickedProduct();
    this.productId = window.location.pathname.split("/")[2];
    console.log(this.productId);
    if (prod.id == undefined) {
      this.productsService.getProductById(parseInt(this.productId)).subscribe((response) => {
        this.product = response;
        console.log(this.product);
        this.getProductsInCart();
      }, (error) => {
        console.log(error);
      });1
    }
    else {
      this.product = prod;
      this.getProductsInCart();
    }

    if (this.productId) {
      this.getSimilarProductsTo();

    }

  }

  getProductsInCart() {
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

    getSimilarProductsTo() {
      this.addingToCart = true;
      this.addedToCart = false;
      this.productsService.getSimilarProducts(parseInt(this.productId)).subscribe((response) => {
        this.similarProducts = response;
        this.getProductsInCart();
      }, (error) => {
        console.log(error);
      });
    }


  changeCurrency(value: number) {
    this.currency = value;
  }

  changeProduct(value: any) {
    this.product = value;
    this.productId = this.product.id;
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.getSimilarProductsTo();
  }

  deleteProduct(value:any) {
    this.showModal = false;
    if (this.product.id) {
      this.productsService.deleteProduct(this.product.id).subscribe((response) => {
        console.log(response);
        document.getElementById('product-route')?.click();
      }, (error) => {
        console.log(error);
      }
      )
    }
  }

  setValues(product: any) {
    this.productsService.setClickedProduct(product);
  }

  addToCart() {
    if (this.authService.isLoggedIn()) {
      this.addingToCart = true;
      let user = localStorage.getItem("userKey");
      let addToCartRequest: ProductToCartRequest = new ProductToCartRequest();
      addToCartRequest.productId = this.productId;
      addToCartRequest.username = user?.toString();
      this.userService.addProductToUserCart(addToCartRequest).subscribe((response) => {
        console.log(response);
        this.addingToCart = false;
        this.addedToCart = true;
      }, (error) => {
        console.log(error);
        this.addingToCart = false;
      })
    }
  }

  sendToCheckout() {
    this.productsService.setClickedProduct(new ProductResponse());
    this.router.navigate(['/payment/checkout'], { queryParams: { id: this.product.id } })
  }

}
