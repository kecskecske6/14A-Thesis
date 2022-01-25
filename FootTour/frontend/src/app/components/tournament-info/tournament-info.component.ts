import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { TournamentModel } from 'src/app/models/Tournament';
import { TeamService } from 'src/app/services/team.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-info',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.sass']
})
export class TournamentInfoComponent implements OnInit {

  tournament: TournamentModel = new TournamentModel();
  teams: Team[] = [];

  constructor(private tournamentService: TournamentService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.getTournamentInfo();
    this.getTeams();
  }

  getTournamentInfo(): void {
    this.tournamentService.getById(1).subscribe(
      (result: TournamentModel) => this.tournament = result,
      error => console.log(error) 
    );
  }

  getTeams(): void {
    this.teamService.getAllByTournamentId(1).subscribe(
      (result: Team[]) => this.teams = result,
      error => console.log(error)
    );
  }

}
