import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AvailableTournamentsComponent } from './components/available-tournaments/available-tournaments.component';
import { TournamentInfoComponent } from './components/tournament-info/tournament-info.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    AvailableTournamentsComponent,
    TournamentInfoComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [{ provide: RECAPTCHA_SETTINGS, useValue: { siteKey: "6LfQDTgdAAAAALWxXWzzcQLexj0O6P7C-CGXXNHW", } as RecaptchaSettings, }, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
