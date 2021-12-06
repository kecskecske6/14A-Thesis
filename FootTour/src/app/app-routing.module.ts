import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AvailableTournamentsComponent } from './components/available-tournaments/available-tournaments.component';
import { TournamentInfoComponent } from './components/tournament-info/tournament-info.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { OrganizierTournamentDashboardComponent } from './components/organizier-tournament-dashboard/organizier-tournament-dashboard.component';
import { OrganizierEarlierTournamentsComponent } from './components/organizier-earlier-tournaments/organizier-earlier-tournaments.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent},
  { path: 'database/tournaments', component: AvailableTournamentsComponent},
  { path: 'mytournaments', component:OrganizierEarlierTournamentsComponent},
  { path: 'database/tournaments/:tournamentinfo', component: TournamentInfoComponent},
  { path: 'currenttournament', component: OrganizierTournamentDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
