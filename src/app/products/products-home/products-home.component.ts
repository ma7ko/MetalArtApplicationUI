import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products/products.service';
import { ProductResponse } from 'src/app/service/products/request/product-request';
import { faPlusSquare, faTrash, faPen, faEye, faAlignJustify, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit, OnDestroy {

  itemsPerRow: Array<number> = [1,2,3,4,5,6,7,8,9,10,11,12];
  rows: Array<number> = [1,2,3,4];
  products: Array<ProductResponse> = [];
  checkedProducts: Array<string> = [];
  showToolbar: boolean = false;
  showModal: boolean = false;
  total: number = 0;
  current: number = 0;
  currentPage: number = 0;
  searchBoxOpened: boolean = false;
  isAdminUser: boolean = false;
  isLoggedIn: boolean = false;
  showPrices: boolean = false;

  faEye = faEye;
  faPen = faPen;
  faTrash = faTrash;
  faCartPlus = faPlusSquare;
  faToggle = faAlignJustify;
  faSearch = faSearch;

  
  constructor(private productsService: ProductsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdminUser();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.getPage(0);
  }

  getPage(page: number, opt?: any) {
    this.productsService.getAll(page).subscribe((response) => {
      console.log(response);
      if (response.content)
        this.products =  response.content;
      if(response.totalCount)
        this.total = response.totalCount;
        if(response.count)
        this.current = response.count
      console.log('here');
      if (opt) {
        document.getElementById('content')?.scrollIntoView(true);
      } else {
      window.scrollTo(0,0);
      }
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
    this.addProduct((<HTMLInputElement>event?.target)?.getAttribute('id')?.toString());
    console.log((<HTMLInputElement>event?.target)?.getAttribute('id')?.toString());
   }

   changePage(value: number) {
     if (this.currentPage != value) {
      document.getElementById('content')?.scrollIntoView(true);
      this.products = new Array<ProductResponse>();
      this.getPage(value, true);
      this.currentPage = value;
     }
   }

   openSearchBox(event:Event) {
     this.searchBoxOpened = !this.searchBoxOpened;
     let searchBox = document.getElementById('search-box');
     if (searchBox) {
     if (searchBox.style.height == "0px")
        searchBox.style.height = "100pc";
      else 
        searchBox.style.height = "0px";
     }
   }

   setShowPrices(value: boolean) {
    this.showPrices = value;
    console.log(this.showPrices);
   }

   searchProducts(value: any) {
     this.productsService.searchProducts(value).subscribe((response) => {
       if (response.content)
        this.products = response.content;
     }, (error) => {
       console.log(error);
     })
   }
   ngOnDestroy(): void {
    this.products = new Array<ProductResponse>();
  }

}
