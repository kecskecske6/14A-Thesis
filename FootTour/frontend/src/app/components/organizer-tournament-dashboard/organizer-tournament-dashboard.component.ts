import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/interfaces/team';
import { TournamentModel } from 'src/app/models/Tournament';
import { TeamService } from 'src/app/services/team.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-organizer-tournament-dashboard',
  templateUrl: './organizer-tournament-dashboard.component.html',
  styleUrls: ['./organizer-tournament-dashboard.component.sass']
})
export class OrganizerTournamentDashboardComponent implements OnInit {

  teams: Team[] = [];
  tournament: TournamentModel = new TournamentModel();

  constructor(private teamService: TeamService, private tournamentService: TournamentService, private router: Router) { }
  
  ngOnInit(): void {
    this.getTeams();
    this.getTournamentInfo();
  }

  getTeams(): void {
    this.teamService.getAllByTournamentId(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      (data: Team[]) => this.teams = data,
      err => console.log(err)
    );
  }

  getTournamentInfo(): void {
    this.tournamentService.getById(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      (data: TournamentModel) => this.tournament = new TournamentModel(data),
      err => console.log(err)
    );
  }

}
