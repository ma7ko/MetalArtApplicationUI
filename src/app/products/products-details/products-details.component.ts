import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products/products.service';
import { ProductResponse } from 'src/app/service/products/request/product-request';
import { faAngleRight, faCartPlus, faCheck, faCross, faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private productsService: ProductsService) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {

    let prod = this.productsService.getClickedProduct();
    this.productId = window.location.pathname.split("/")[2];
    console.log(prod.id);
    if (prod.id == undefined) {
      this.productsService.getProductById(parseInt(this.productId)).subscribe((response) => {
        this.product = response;
        console.log(this.product);
      }, (error) => {
        console.log(error);
      });
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

}
