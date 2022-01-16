import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'FootTour';

  public constructor(private titleService: Title, public userService: UserService, private auth: AuthService) {
    if(this.auth.getToken()){
      this.userService.getUserById(Number(this.auth.getId())).subscribe(
        response => {
          console.log(response);
          this.userService.SetUser(response);
        },
        error =>{
          console.log(error);
        }
      );
    }
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(`FootTour | ${newTitle}`);
  }
  public logOutOnClick(){
    this.auth.logout();
  }
}
