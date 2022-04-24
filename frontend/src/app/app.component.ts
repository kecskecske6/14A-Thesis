import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'FootTour';

  public constructor(public userService: UserService, private auth: AuthService) {
    if(this.auth.isLoggedIn()){
      this.userService.SetUser(userService.getName()!);
    }
  }

  public logOutOnClick(){
    this.auth.logout();
  }
}
