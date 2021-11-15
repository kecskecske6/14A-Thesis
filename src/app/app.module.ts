import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
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
    FormsModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [{provide: RECAPTCHA_SETTINGS, useValue:{siteKey: "6LfQDTgdAAAAALWxXWzzcQLexj0O6P7C-CGXXNHW",} as RecaptchaSettings,}],
  bootstrap: [AppComponent]
})
export class AppModule { }
