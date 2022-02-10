import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products/products.service';
import { ProductResponse } from 'src/app/service/products/request/product-request';
import { faAngleRight, faCartPlus, faCheck, faCross, faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  angleRight = faAngleRight;
  tick = faCheck;
  cross = faTimes;
  cart = faCartPlus;
  editIcon = faPen;
  deleteIcon = faTrash;

  product: any;
  productId: string = '';
  currency: number = 0;
  similarProducts: any;
  placeholderArray: Array<number> = [1,2,3];
  showModal=false;
  isAdminUser: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private productsService: ProductsService, private authService: AuthService) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdminUser();
    this.isLoggedIn = this.authService.isLoggedIn();
    let prod = this.productsService.getClickedProduct();
    this.productId = window.location.pathname.split("/")[2];
    console.log(prod.id);
    if (prod.id == undefined) {
      this.productsService.getProductById(parseInt(this.productId)).subscribe((response) => {
        this.product = response;
        console.log(this.product);
      }, (error) => {
        console.log(error);
      });1
    }
    else {
      this.product = prod;
    }

    if (this.productId) {
      this.getSimilarProductsTo();

    }
  }

    getSimilarProductsTo() {
      this.productsService.getSimilarProducts(parseInt(this.productId)).subscribe((response) => {
        this.similarProducts = response;
      }, (error) => {
        console.log(error);
      });
    }


  changeCurrency(value: number) {
    this.currency = value;
  }

  changeProduct(value: any) {
    this.product = value;
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

}
