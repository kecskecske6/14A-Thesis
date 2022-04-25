import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/interfaces/team';
import { TournamentModel } from 'src/app/models/Tournament';
import { TeamService } from 'src/app/services/team.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tournament-info',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.sass']
})
export class TournamentInfoComponent implements OnInit {

  tournament: TournamentModel = new TournamentModel();
  teams: Team[] = [];
  organizerName = '';
  type: string = '';

  constructor(private tournamentService: TournamentService, private teamService: TeamService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getTournamentInfo();
    this.getTeams();
    this.type = localStorage.getItem('type')!;
  }

  getTournamentInfo(): void {
    this.tournamentService.getById(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      (result: TournamentModel) => {
        this.tournament = new TournamentModel(result);
        this.getOrganizerName();
      },
      error => console.log(error)
    );
  }

  getTeams(): void {
    this.teamService.getAllByTournamentId(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      (result: Team[]) => this.teams = result,
      error => console.log(error)
    );
  }

  getOrganizerName(): void {
    this.userService.getById(this.tournament.organizerId).subscribe(
      result => this.organizerName = result.name,
      error => console.log(error)
    );
  }

}
