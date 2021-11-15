import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module  } from "ng-recaptcha";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    RecaptchaV3Module
  ],
  providers: [{provide: RECAPTCHA_V3_SITE_KEY, useValue:"6Lc4wjcdAAAAAF-Yo1C2HrSThKcsrM8vFppMSOeT"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
