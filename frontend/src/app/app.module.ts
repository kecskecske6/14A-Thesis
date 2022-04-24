import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AvailableTournamentsComponent } from './components/available-tournaments/available-tournaments.component';
import { TournamentInfoComponent } from './components/tournament-info/tournament-info.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MatchReportComponent } from './components/match-report/match-report.component';
import { OrganizerTournamentDashboardComponent } from './components/organizer-tournament-dashboard/organizer-tournament-dashboard.component';
import { OrganizerEarlierTournamentsComponent } from './components/organizer-earlier-tournaments/organizer-earlier-tournaments.component';
import { RefereeMatchReportComponent } from './components/referee-match-report/referee-match-report.component';
import { TournamentScheduleComponent } from './components/tournament-schedule/tournament-schedule.component';
import { DrawComponent } from './components/draw/draw.component';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './auth/token.interceptor';
import { TeamRegistrationToTournamentsComponent } from './components/team-registration-to-tournaments/team-registration-to-tournaments.component';
import { NewTournamentComponent } from './components/new-tournament/new-tournament.component';
import { CommonModule } from '@angular/common';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxMultipleDatesModule } from 'ngx-multiple-dates';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AwardsComponent } from './components/awards/awards.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    AvailableTournamentsComponent,
    TournamentInfoComponent,
    MainPageComponent,
    MatchReportComponent,
    OrganizerTournamentDashboardComponent,
    OrganizerEarlierTournamentsComponent,
    RefereeMatchReportComponent,
    TournamentScheduleComponent,
    DrawComponent,
    TeamRegistrationToTournamentsComponent,
    NewTournamentComponent,
    AwardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    RouterModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSliderModule,
    NgxMultipleDatesModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        }
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [{ provide: RECAPTCHA_SETTINGS, useValue: { siteKey: "6LfQDTgdAAAAALWxXWzzcQLexj0O6P7C-CGXXNHW", } as RecaptchaSettings, },
              {provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
