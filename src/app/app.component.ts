import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'FootTour';

  status = {
    isDisplayed: true
  };

  openLoginPage(){
    this.status.isDisplayed = false;
  }
}
