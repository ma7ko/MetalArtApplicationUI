import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { RegisterRequest } from 'src/app/service/user/request/user-request';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  errorRegister:boolean = false;
  faExc = faExclamationCircle;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let data = new RegisterRequest();
    data.username = this.registerForm.controls['username'].value;
    data.password = this.registerForm.controls['password'].value;
    data.passwordConfirm = this.registerForm.controls['confirmPassword'].value;
    console.log(data);
    this.userService.register(data).subscribe((response) => {
      this.router.navigate(['/login']);
    }, (error) => {
      this.errorRegister = true;
    });
  }

}
