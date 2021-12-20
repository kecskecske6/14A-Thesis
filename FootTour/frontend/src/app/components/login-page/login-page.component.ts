import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})

export class LoginPageComponent implements OnInit {

  users : User = null;
  error = '';
  success = '';

  constructor(private userService: UserService) {
   }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void{
    this.userService.getAll().subscribe(
      (data: User) => {
        this.users = data;
        this.success = 'succes';
      },
      (err) =>{
        console.log(err);
        this.error = err;
      }
    );
  }
}
