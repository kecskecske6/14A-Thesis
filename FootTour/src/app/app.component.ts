import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'FootTour';

  public constructor(private titleService: Title) {}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(`FootTour | ${newTitle}`);
  }
}
