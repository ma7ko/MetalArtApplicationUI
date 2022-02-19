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
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  errorRegister:boolean = false;
  faExc = faExclamationCircle;
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    let data = new RegisterRequest();
    data.username = this.registerForm.controls['username'].value;
    data.email = this.registerForm.controls['email'].value;
    data.password = this.registerForm.controls['password'].value;
    data.passwordConfirm = this.registerForm.controls['confirmPassword'].value;
    console.log(data);
    this.userService.register(data).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/auth']);
    }, (error) => {
      console.log(error);
      this.errorRegister = true;
    });
  }

}
