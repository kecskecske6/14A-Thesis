import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})

export class LoginPageComponent implements OnInit {

  loginForm! : FormGroup;
  email! :string;
  password! : string;
  user!: User;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
   this.authService.logout();
  }

  onSubmit(){
    const loginData = {
      email : this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }
    this.authService.loginForm(loginData).subscribe(response =>{
      if(response.status === 'success'){
        this.authService.setUser(response);
        localStorage.setItem("name", response.name);
        this.userService.SetUser(response.name);
        this.router.navigate(['/mytournaments']);
      }
    },
    error =>{
      console.log(error);
    });
  }
}
