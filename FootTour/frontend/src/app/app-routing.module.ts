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

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'database/tournaments', component: AvailableTournamentsComponent },
  { path: 'mytournaments', component: OrganizerEarlierTournamentsComponent },
  { path: 'database/tournaments/:tournamentinfo', component: TournamentInfoComponent },
  { path: 'matchreport', component: MatchReportComponent },
  { path: 'currenttournament', component: OrganizerTournamentDashboardComponent },
  { path: 'matchreport/referee', component: RefereeMatchReportComponent },
  { path: 'schedule', component: TournamentScheduleComponent },
  { path: 'draw', component: DrawComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
