import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faMinus, faPlus, faAngleRight, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/service/products/products.service';
import { Dimension, ProductResponse } from 'src/app/service/products/request/product-request';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TranslateService } from '@ngx-translate/core';
import { LetterFormControl } from 'src/app/model/letter-only/letter-form-control';
import { PositiveNumberFormControl } from 'src/app/model/positive-number-only/positive-number-form-control';
import { AmountFormControl } from 'src/app/model/amount/amount-form-control';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.css']
})
export class ProductsCreateComponent implements OnInit {

  image: File | undefined;

  createForm = new FormGroup({
    name: new LetterFormControl('', [Validators.required]),
    description: new LetterFormControl('', [Validators.required]),
    price: new AmountFormControl('', [Validators.required]),
    amount: new AmountFormControl(0, [Validators.required]),
    available: new FormControl('', [Validators.required]),
    shape: new FormControl(0, [Validators.required]),
    width: new FormControl('', [Validators.required]),
    height: new FormControl('', [Validators.required]),
    depth: new FormControl('', [Validators.required])
  });

  arrowUp = faPlus as IconProp;
  arrowDown = faMinus as IconProp;
  angleRight = faAngleRight as IconProp;
  upload = faFileUpload as IconProp;

  constructor(private productService: ProductsService, private translateService: TranslateService) { 
    this.translateService.setDefaultLang('mk');
    this.translateService.use('mk');
  }

  ngOnInit(): void {
  }

  onChange(event: Event) {
    let element = <HTMLInputElement>event.target;

    if (element.files != null) {
      this.image = element.files[0];
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      if (document.getElementById('img-holder')?.firstChild == null) {
        var img = document.createElement("img");
        if (e.target?.result?.toString() != undefined)
          img.src = e.target?.result?.toString();
        img.classList.add('w-100');
        img.style.borderRadius = "20px";
        img.style.border = "10px solid teal";
        img.style.padding = "20px";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        document.getElementById('img-holder')?.appendChild(img);
      } else {
        let imgElement = document.getElementById('img-holder')?.firstChild;
        if (imgElement)
          if (e.target?.result?.toString() != undefined)
            (<HTMLImageElement>imgElement).src = e.target?.result?.toString();
      }
    }

    if (this.image)
      reader.readAsDataURL(this.image);

    this.checkAllFilled();

  }

  changeAmount(incrase: boolean) {
    let amountControl = this.createForm.controls['amount'];
    console.log(amountControl);
    amountControl.setValue(incrase ? parseInt(amountControl.value) + 1 : parseInt(amountControl.value) - 1);
  }

  setPrice(price: string) {
    if (price) {
      this.createForm.controls['price'].setValue(parseInt(price));
      this.checkAllFilled();
    }
  }

  setShape(shape: string) {
    this.createForm.controls['shape'].setValue(parseInt(shape));
    console.log(this.createForm);
    this.checkAllFilled();
  }

  setDimensions(dimension: Dimension) {
    console.log(dimension);
    this.createForm.controls['width'].setValue(dimension.width);
    this.createForm.controls['height'].setValue(dimension.height);
    this.createForm.controls['depth'].setValue(dimension.depth);
    this.checkAllFilled();
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

  checkAllFilled() {
    let values = Object.keys(this.createForm.controls).map(key => {
      let val = this.createForm.controls[key].value;
      if (key == 'shape' || key == 'available' || key == 'amount')
        return 'valid';
      if (val != null && val != undefined && val != '') {
        if ((key == 'name' || key == 'description') && val.length > 4) {
          return 'valid';
        } else if (key != 'name' && key != 'description') {
          return 'valid';
        } else {
          return 'invalid';
        }
      }
      else 
        return 'invalid';
    });

    console.log(values);
    console.log(this.createForm.controls);

    if (!values.includes('invalid') && this.image != undefined)
      (<HTMLButtonElement>document.querySelector('.submit-btn')).disabled = false;
    else 
      (<HTMLButtonElement>document.querySelector('.submit-btn')).disabled = true;
  }

}
