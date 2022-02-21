import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/interfaces/team';
import { TeamModel } from 'src/app/models/Team';
import { TournamentModel } from 'src/app/models/Tournament';
import { DrawService } from 'src/app/services/draw.service';
import { TeamService } from 'src/app/services/team.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.sass']
})
export class DrawComponent implements OnInit {

  tournament = new TournamentModel();

  teams: TeamModel[] = [];

  constructor(private router: Router, private tournamentService: TournamentService, private teamService: TeamService, private drawService: DrawService) { }

  ngOnInit(): void {
    this.getTournamentInfo();
    this.getTeams();
  }

  draw() {
    this.drawService.create(this.tournament, this.teams).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
    this.tournamentService.modify(this.tournament).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
    this.router.navigate(['/schedule/' + this.router.url.substring(this.router.url.lastIndexOf('/') + 1)]);
  }

  getTournamentInfo(): void {
    this.tournamentService.getById(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      (data: TournamentModel) => this.tournament = new TournamentModel(data),
      err => console.log(err)
    );
  }

  getTeams(): void {
    this.teamService.getAllByTournamentId(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      (data: TeamModel[]) => this.teams = data,
      err => console.log(err)
    );
  }

}
