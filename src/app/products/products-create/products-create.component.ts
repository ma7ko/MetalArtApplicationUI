import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faMinus, faPlus, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/service/products/products.service';
import { Dimension, ProductResponse } from 'src/app/service/products/request/product-request';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})
export class ProductsCreateComponent implements OnInit {

  image: File | undefined;

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    amount: new FormControl(0, [Validators.required]),
    available: new FormControl('', [Validators.required]),
    shape: new FormControl(0, [Validators.required]),
    width: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    depth: new FormControl('', [Validators.required])
  });

  arrowUp = faPlus;
  arrowDown = faMinus;
  angleRight = faAngleRight;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
  }

  onChange(event: Event) {
    let element = <HTMLInputElement>event.target;

    if (element.files != null) {
      this.image = element.files[0];
    }

    var reader  = new FileReader();
    reader.onload = function(e)  {
        var img = document.createElement("img");
        if (e.target?.result?.toString() != undefined)
        img.src = e.target?.result?.toString();
        img.classList.add('w-100');
        img.style.borderRadius="20px";
        img.style.border = "10px solid teal";
        img.style.padding = "20px";
        img.style.height= "100%";
        img.style.objectFit = "cover";
        document.getElementById('img-holder')?.appendChild(img);
    }

    if (this.image)
      reader.readAsDataURL(this.image);
  
  }

  changeAmount(incrase: boolean) {
    let amountControl = this.createForm.controls['amount'];
    amountControl.setValue(incrase ? amountControl.value + 1 : amountControl.value - 1);
  }

  setPrice(price: string) {
    if (price) {
      this.createForm.controls['price'].setValue(parseInt(price));
    }
  }

  setShape(shape: string) {
    this.createForm.controls['shape'].setValue(parseInt(shape));
    console.log(this.createForm);
  }

  setDimensions(dimension: Dimension) {
    console.log(dimension);
    this.createForm.controls['width'].setValue(dimension.width);
    this.createForm.controls['height'].setValue(dimension.height);
    this.createForm.controls['depth'].setValue(dimension.depth);
  }

  onSubmit() {
    let dim: Dimension = new Dimension();
    dim.width = this.createForm.controls['width'].value;
    dim.height = this.createForm.controls['height'].value;
    dim.depth = this.createForm.controls['depth'].value;

    let product: ProductResponse = new ProductResponse();
    product.width = dim.width;
    product.height = dim.height;
    product.depth = dim.depth;
    product.amount = this.createForm.controls['amount'].value;
    product.available = this.createForm.controls['available'].value;
    product.description = this.createForm.controls['description'].value;
    product.price = this.createForm.controls['price'].value;
    product.shape = this.createForm.controls['shape'].value;
    product.name = this.createForm.controls['name'].value;

    this.productService.create(product, this.image).subscribe((response) => {
      document.getElementById('product-route')?.click();
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    

  }

}
