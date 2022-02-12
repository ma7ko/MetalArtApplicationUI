import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { ProductsService } from 'src/app/service/products/products.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: any = 0;
  filledForm: boolean = false;
  checkoutForm = new FormGroup({
    billingAddress: new FormControl('', Validators.required),
    creditCardRadio: new FormControl(true, Validators.required),
    nameOnCard: new FormControl('', Validators.required),
    cardNumber: new FormControl('', Validators.required),
    mmYY: new FormControl('', Validators.required),
    securityCode: new FormControl('', Validators.required),
    zipPostalCode: new FormControl('', Validators.required)
  });

  creditCardIcon = faCreditCard;

  constructor(private _location: Location, private productsService: ProductsService, private userService: UserService) { }

  ngOnInit(): void {
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
  }

  checkAllFilled() {
    let values = Object.keys(this.checkoutForm.controls).map(key => {
      return this.checkoutForm.controls[key].value.length;
    });

    if (!values.includes(0))
      (<HTMLButtonElement>document.getElementById('submit-btn')).disabled = false;

    console.log(values);
  }

  goBack() {
    this._location.back();
  }

}
