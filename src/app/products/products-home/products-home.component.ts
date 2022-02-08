import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products/products.service';
import { ProductResponse } from 'src/app/service/products/request/product-request';
import { faPlusSquare, faTrash, faPen, faEye, faAlignJustify } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {

  itemsPerRow: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12];
  rows: Array<number> = [1,2,3,4];
  products: Array<ProductResponse> = [];
  checkedProducts: Array<string> = [];
  showToolbar: boolean = false;
  showModal: boolean = false;
  total: number = 0;
  current: number = 0;
  currentPage: number = 0;

  faEye = faEye;
  faPen = faPen;
  faTrash = faTrash;
  faCartPlus = faPlusSquare;
  faToggle = faAlignJustify;

  
  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.getPage(0);
  }

  getPage(page: number) {
    this.productsService.getAll(page).subscribe((response) => {
      console.log(response);
      if (response.content)
        this.products =  response.content;
      if(response.totalCount)
        this.total = response.totalCount;
        if(response.count)
        this.current = response.count
      console.log('here');
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    (error) => {
      console.log("Could not load products");
    });
  }

  addProduct(value: any) {
   if ( this.checkedProducts.includes(value) )
      this.checkedProducts.splice(this.checkedProducts.indexOf(value),1);
    else 
    this.checkedProducts.push(value);

    console.log(this.checkedProducts);
  }

  bulkDeleteProducts(value: boolean) {
    this.showModal = false;
    if (this.checkedProducts.length > 0) {
      this.productsService.bulkDeleteProducts(this.checkedProducts).subscribe((response) => {
        console.log(response);
        location.reload();
      }, (error) => {
        console.log(error);
      }
      )
    }
  }

  setValues(product: ProductResponse) {
    this.productsService.setClickedProduct(product);
  }

  ticked(event: Event) {
    this.addProduct((<HTMLInputElement>event?.target)?.parentElement?.parentElement?.getAttribute('id')?.toString());
   }

   changePage(value: number) {
     if (this.currentPage != value) {
      this.getPage(value);
      this.currentPage = value;
     }
   }
}
