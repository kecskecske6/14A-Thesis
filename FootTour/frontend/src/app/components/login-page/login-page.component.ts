import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { filter } from 'rxjs/operators'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})

export class LoginPageComponent implements OnInit {

  loginForm! : FormGroup;
  message!: string;
  token!: string;
  email! : string;

  constructor(private formBuilder: FormBuilder, private Router:Router, private UserService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  onSubmit(){
    const loginData = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };

      this.UserService.login(loginData).subscribe(
        result =>{
          console.log(result);
          this.UserService.setUser(result);
          this.Router.navigate(['']);
        },
        error =>{
          console.log(error);
        }
      )
  }
}
