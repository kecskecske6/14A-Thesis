import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AvailableTournamentsComponent } from './components/available-tournaments/available-tournaments.component';
import { TournamentInfoComponent } from './components/tournament-info/tournament-info.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent},
  { path: 'availabletournaments', component: AvailableTournamentsComponent},
  { path: 'availabletournaments/:tournamentinfo', component: TournamentInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
