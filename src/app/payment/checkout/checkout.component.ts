import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCreditCard, faLock } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { ProductsService } from 'src/app/service/products/products.service';
import { UserService } from 'src/app/service/user/user.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DateFormControl } from 'src/app/model/date/date-form-control';
import { SecurityCodeFormControl } from 'src/app/model/security-code/security-code-form-control';
import { CreditCardFormControl } from 'src/app/model/credit-card/credit-card-form-control';
import { NameFormControl } from 'src/app/model/name/name-form-control';
import { ZipCodeFormControl } from 'src/app/model/zip-code/zip-code-form-control';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: any = 0;
  filledForm: boolean = false;
  faLock = faLock as IconProp;
  checkoutForm = new FormGroup({
    billingAddress: new FormControl('', Validators.required),
    creditCardRadio: new FormControl(true, Validators.required),
    nameOnCard: new NameFormControl('', Validators.required),
    cardNumber: new CreditCardFormControl('', Validators.required),
    mmYY: new DateFormControl('', Validators.required),
    securityCode: new SecurityCodeFormControl('', Validators.maxLength(3)),
    zipPostalCode: new ZipCodeFormControl('', Validators.required)
  });

  creditCardIcon = faCreditCard as IconProp;

  constructor(private _location: Location, private productsService: ProductsService, private userService: UserService, private httpClient: HttpClient) {
   }

  ngOnInit(): void {
    this.httpClient.get("https://ipinfo.io").subscribe((response: any) => {
      console.log(response);
      this.checkoutForm.controls['billingAddress'].setValue(response.city + ", " + response.country);
      this.checkoutForm.controls['zipPostalCode'].setValue(response.postal);
    }, error => console.log(error));
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      this.productsService.getProductById(parseInt(id)).subscribe((response) => {
        this.totalPrice = response.price;
      }, (error) => {
        console.log(error);
      });
    } else {
      let user = localStorage.getItem("userKey");
      if (user) {
        this.userService.getUserProducts(user).subscribe((response) => {
          this.totalPrice = Object.values(response).map((obj: any) => obj.price).reduce((acc: any, val: any) => acc + val, 0);
          console.log(response);
        }, (error) => {
          console.log(error);
        });
      }
    }
    document.body.scrollIntoView(true);
    console.log(this.checkoutForm.controls);
  }

  checkAllFilled() {
    let values = Object.keys(this.checkoutForm.controls).map(key => {
      if (key == "cardNumber") {
        if (this.checkoutForm.controls[key].value.length < 19)
          return 0;
        else 
          return this.checkoutForm.controls[key].value.length;
      } else if (key == "mmYY") {
        if (this.checkoutForm.controls[key].value.length < 5)
          return 0;
        else 
          return this.checkoutForm.controls[key].value.length;
      } else if (key == "securityCode") {
        if (this.checkoutForm.controls[key].value.length < 3)
          return 0;
        else 
          return this.checkoutForm.controls[key].value.length;
      }
      return this.checkoutForm.controls[key].value.length;
    });

    if (!values.includes(0))
      (<HTMLButtonElement>document.getElementById('submit-btn')).disabled = false;
    else 
      (<HTMLButtonElement>document.getElementById('submit-btn')).disabled = true;

    console.log(values);
    console.log(this.checkoutForm.controls);
  }

  goBack() {
    this._location.back();
  }

  focusField(event: Event) {
    document.querySelectorAll('.label-checkout').forEach(e => { if (e != (<HTMLElement>event.target).parentElement?.parentElement?.querySelector('label')) { e.classList.remove('label-dark'); } });
    (<HTMLElement>event.target).parentElement?.parentElement?.querySelector('label')?.classList.add("label-dark");
  }

}
