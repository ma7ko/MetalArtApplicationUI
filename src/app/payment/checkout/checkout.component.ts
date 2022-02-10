import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
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
  
  constructor(private _location: Location) { }

  ngOnInit(): void {
    console.log(window.history);
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
