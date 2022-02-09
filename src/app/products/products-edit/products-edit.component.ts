import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products/products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faPlus, faMinus, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Dimension, ProductResponse } from 'src/app/service/products/request/product-request';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit, OnDestroy {

  image: File | undefined;
  product: any;

  editForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    available: new FormControl('', [Validators.required]),
    shape: new FormControl(0, [Validators.required]),
    width: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    depth: new FormControl('', [Validators.required])
  });

  dimension: Dimension = new Dimension();
  productId: any;

  arrowUp = faPlus;
  arrowDown = faMinus;
  angleRight = faAngleRight;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    let prod = this.productService.getClickedProduct();
    this.productId = window.location.pathname.split("/")[2];
    console.log(prod.id);
    if (prod.id == undefined) {
      this.productService.getProductById(parseInt(this.productId)).subscribe((response) => {
        console.log(response);
        this.product = response;
        this.setProduct();
        console.log(this.product);
      }, (error) => {
        console.log(error);
      });
    }
    else {
      this.product = prod;
      this.setProduct();
    }

  }

  setProduct() {

    this.editForm.controls['name'].setValue(this.product?.name.toString());
    this.editForm.controls['description'].setValue(this.product?.description.toString());
    this.editForm.controls['price'].setValue(this.product?.price);
    this.editForm.controls['amount'].setValue(this.product?.amount);
    this.editForm.controls['available'].setValue(this.product?.available);
    if (this.product?.shape == "ROUNDED")
      this.editForm.controls['shape'].setValue(0);
    else if (this.product?.shape == "SQUARED")
      this.editForm.controls['shape'].setValue(1);
    else 
      this.editForm.controls['shape'].setValue(2);
    this.editForm.controls['width'].setValue(this.product?.dimension?.width);
    this.editForm.controls['height'].setValue(this.product?.dimension?.height);
    this.editForm.controls['depth'].setValue(this.product?.dimension?.depth);

    this.dimension.id = this.product.dimension.id;
    this.dimension.width = this.product.width;
    this.dimension.height = this.product.height;
    this.dimension.depth = this.product.depth;
  }

  setPrice(price: string) {
    if (price) {
      this.editForm.controls['price'].setValue(parseInt(price));
    }
  }

  setShape(shape: string) {
    this.editForm.controls['shape'].setValue(parseInt(shape));
    console.log(this.editForm);
  }

  setDimensions(dimension: Dimension) {
    console.log(dimension);
    this.editForm.controls['width'].setValue(dimension.width);
    this.editForm.controls['height'].setValue(dimension.height);
    this.editForm.controls['depth'].setValue(dimension.depth);
  }

  setAmount(amount: number) {
    console.log(amount);
    this.editForm.controls['amount'].setValue(amount);
  }

  onChange(event: Event) {
    let element = <HTMLInputElement>event.target;

    if (element.files != null) {
      this.image = element.files[0];
    }
    var reader  = new FileReader();
    reader.onload = function(e)  {
      if (document.getElementById('img-holder')?.firstChild == null) {
        var img = document.createElement("img");
        if (e.target?.result?.toString() != undefined)
        img.src = e.target?.result?.toString();
        img.classList.add('img-class');
        document.getElementById('img-holder')?.appendChild(img); 
      }
        else {
          let imgElement = document.getElementById('img-holder')?.firstChild;
        if (imgElement)
          if (e.target?.result?.toString() != undefined)
            (<HTMLImageElement>imgElement).src = e.target?.result?.toString();
        }
    }

    if (this.image)
    reader.readAsDataURL(this.image);
  
  }

  onSubmit() {
    let dim: Dimension = new Dimension();
    dim.width = this.editForm.controls['width'].value;
    dim.height = this.editForm.controls['height'].value;
    dim.depth = this.editForm.controls['depth'].value;

    let product: ProductResponse = new ProductResponse();
    console.log(this.product.dimension.id);
    product.dimid = this.dimension.id;
    product.width = dim.width;
    product.height = dim.height;
    product.depth = dim.depth;
    product.amount = this.editForm.controls['amount'].value;
    product.available = this.editForm.controls['available'].value;
    product.description = this.editForm.controls['description'].value;
    product.price = this.editForm.controls['price'].value;
    product.shape = this.editForm.controls['shape'].value;
    product.name = this.editForm.controls['name'].value;

    this.productService.update(product, this.productId, this.image).subscribe((response) => {
      document.getElementById('product-route')?.click();
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    

  }

  ngOnDestroy() {
    this.productService.setClickedProduct(new ProductResponse());
  }

}
