import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products/products.service';
import { ProductResponse } from 'src/app/service/products/request/product-request';
import { faPlusSquare, faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {

  itemsPerRow: Array<number> = [1,2,3];
  rows: Array<number> = [1,2,3,4];
  products: Array<ProductResponse> = [];

  faEye = faEye;
  faPen = faPen;
  faTrash = faTrash;
  faCartPlus = faPlusSquare;

  
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAll().subscribe((response) => {
      this.products =  response;
      console.log('here');
    },
    (error) => {
      console.log("Could not load products");
    });
  }

}
