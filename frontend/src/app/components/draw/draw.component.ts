import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamModel } from 'src/app/models/Team';
import { TournamentModel } from 'src/app/models/Tournament';
import { UserModel } from 'src/app/models/User';
import { DrawService } from 'src/app/services/draw.service';
import { GroupService } from 'src/app/services/group.service';
import { TeamService } from 'src/app/services/team.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.sass']
})
export class DrawComponent implements OnInit {

  tournament = new TournamentModel();

  referee: UserModel = new UserModel();

  teams: TeamModel[] = [];

  referees: UserModel[] = [];

  enableDraw = true;

  id: number = 0;

  underModify = {
    status: false,
    index: -1,
    id: 0
  }

  constructor(private router: Router, private tournamentService: TournamentService, private teamService: TeamService, private drawService: DrawService, private groupService: GroupService, private userService: UserService) { }

  ngOnInit(): void {
    this.getTournamentInfo();
    this.alreadyDrawn();
  }

  draw() {
    this.tournamentService.modify(this.tournament).subscribe(
      result => {
        this.drawService.create(this.tournament, this.teams, this.referees).subscribe(
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

  modify(index: number, referee: UserModel) {
    this.underModify.status = true;
    this.underModify.index = index;
    this.underModify.id = referee.id;
  }

  deletePlayer(index: number) {
    this.referees.splice(index, 1);
  }

  checkDuplicateNumbers() {
    if (this.referees.some(p => p.id === this.id)) return true;
    return false;
  }

  savePlayer() {
    if (this.id > 0 && this.underModify.status == false) {
      if (!this.checkDuplicateNumbers()) {
        this.referee.id = this.id;
        this.userService.getById(this.referee.id).subscribe(
          result => {
            this.referee.name = result;
            this.referees.push(this.referee);
            this.referee = new UserModel();
            this.id = 0;
            console.log(this.referees);
          },
          error => console.log(error)
        );
      }
      else {
        console.log("Már létezik ilyen mezszámú játékos!");
      }
    }
    else {
      console.log("Rosszu")
      //TODO helytelen adat alert
    }
  }

  stopModifyWithSave(index: number, referee: UserModel) {
    if (!this.checkDuplicateNumbers()) {
      referee.id = this.underModify.id;
      this.referees[index] = referee;
      this.stopModify();
    }
    else console.log("Már létezik ilyen mezszámú játékos!");
  }

  stopModify() {
    this.underModify.status = false;
    this.underModify.id = 0;
    this.underModify.index = -1;
  }

}
