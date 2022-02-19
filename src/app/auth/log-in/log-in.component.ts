import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faFeather, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AuthRequest, AuthResponse } from 'src/app/service/auth/request/auth-request';
import { KeyHolder } from 'src/app/service/route-constants/auth-key';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  faFeather = faFeather;
  faExc = faExclamationCircle;
  errorAuth: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let data = new AuthRequest();
    data.username = this.loginForm.controls['username'].value;
    data.password = this.loginForm.controls['password'].value;
    console.log(data);
    this.authService.authenticate(data).subscribe((response) => {
      KeyHolder.authKey = response.jwt;
    }, (error) => {
      this.errorAuth = true;
    });
  }

}
