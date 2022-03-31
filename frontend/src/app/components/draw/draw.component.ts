import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamModel } from 'src/app/models/Team';
import { TournamentModel } from 'src/app/models/Tournament';
import { DrawService } from 'src/app/services/draw.service';
import { GroupService } from 'src/app/services/group.service';
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

  enableDraw = true;

  constructor(private router: Router, private tournamentService: TournamentService, private teamService: TeamService, private drawService: DrawService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.getTournamentInfo();
    this.alreadyDrawn();
  }

  draw() {
    this.tournamentService.modify(this.tournament).subscribe(
      result => {
        this.drawService.create(this.tournament, this.teams).subscribe(
          result => console.log(result),
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
    this.router.navigate(['/schedule/' + this.router.url.substring(this.router.url.lastIndexOf('/') + 1)]);
  }

  getTournamentInfo(): void {
    this.tournamentService.getById(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      (data: TournamentModel) => {
        this.tournament = new TournamentModel(data);
        this.getTeams();
      },
      err => console.log(err)
    );
  }

  getTeams(): void {
    this.teamService.getAllByTournamentId(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      (data: TeamModel[]) => this.teams = data,
      err => console.log(err)
    );
  }

  alreadyDrawn(): void {
    this.groupService.getByTournamentId(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      result => {
        if (result.length > 0) this.enableDraw = false;
        console.log(result);
      },
      error => console.log(error)
    );
  }

}
