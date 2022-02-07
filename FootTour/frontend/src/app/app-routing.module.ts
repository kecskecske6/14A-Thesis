import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'database/tournaments',canActivate:[AuthGuard], component: AvailableTournamentsComponent },
  { path: 'mytournaments', canActivate:[AuthGuard], component: OrganizerEarlierTournamentsComponent },
  { path: 'database/tournaments/:tournamentinfo', canActivate:[AuthGuard], component: TournamentInfoComponent },
  { path: 'matchreport/:id', canActivate:[AuthGuard], component: MatchReportComponent },
  { path: 'mytournaments/:id', canActivate:[AuthGuard], component: OrganizerTournamentDashboardComponent },
  { path: 'referee/:id', canActivate:[AuthGuard], component: RefereeMatchReportComponent },
  { path: 'schedule/:id', canActivate:[AuthGuard], component: TournamentScheduleComponent },
  { path: 'draw/:id', canActivate:[AuthGuard], component: DrawComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
