import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/interfaces/team';
import { GroupModel } from 'src/app/models/Group';
import { TeamstoGroupsModel } from 'src/app/models/TeamstoGroups';
import { TournamentModel } from 'src/app/models/Tournament';
import { GroupService } from 'src/app/services/group.service';
import { TeamService } from 'src/app/services/team.service';
import { TeamstoGroupsService } from 'src/app/services/teamsto-groups.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.sass']
})
export class DrawComponent implements OnInit {

  tournament = new TournamentModel();

  teams: Team[] = [];

  groups: GroupModel[] = [];

  constructor(private router: Router, private tournamentService: TournamentService, private teamService: TeamService, private groupService: GroupService, private teamstoGroupsService: TeamstoGroupsService) { }

  ngOnInit(): void {
    this.getTournamentInfo();
    this.getTeams();
  }

  set(value: string) {
    this.tournament.type = value;
  }

  draw() {
    if (this.tournament.type == 'Csoportkör és kieséses') {
      const groups: Team[][] = [];
      for (let i = 0; i < this.tournament.teamsCount / this.tournament.groupsAmount; i++) groups.push([]);
      for (let i = 0; i < this.teams.length; i++) {
        let team;
        let doAgain;
        do {
          team = this.teams[Math.floor(Math.random() * this.teams.length)];
          doAgain = false;
          for (let j = 0; j < groups.length; j++) {
            if (groups[j].includes(team)) doAgain = true;
          }
        } while (doAgain);
        groups[Math.floor(i / this.tournament.groupsAmount)].push(team);
      }
    }
    else {
      const pairs: Team[][] = [];
      for (let i = 0; i < this.tournament.teamsCount / 2; i++) pairs.push([]);
      for (let i = 0; i < this.teams.length; i++) {
        let team, doAgain;
        do {
          team = this.teams[Math.floor(Math.random() * this.teams.length)];
          doAgain = false;
          for (let j = 0; j < pairs.length; j++) {
            if (pairs[j].includes(team)) doAgain = true;
          }
        } while (doAgain);
        pairs[Math.floor(i / 2)].push(team);
      }
      this.saveGroups(pairs)
    }
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
      (data: Team[]) => this.teams = data,
      err => console.log(err)
    );
  }

  saveGroups(groups: Team[][]): void {
    if (groups[0].length == 2) {
      let i = 0;
      let groupIndex = 0;
      groups.forEach(async g => {
        let name: string = '';
        if (this.tournament.teamsCount == 8) name = `QF${++i}`;
        const model = {
          tournament_id: this.router.url.substring(this.router.url.lastIndexOf('/') + 1),
          name: name
        }
        await this.groupService.create(new GroupModel(model)).toPromise().then(a => {
          this.groups.push(new GroupModel(a));
        });
        g.forEach(t => {
          let teamIndex = 0;
          const teamstoGroupsModel = {
            team_id: t.id,
            group_id: this.groups[groupIndex].id
          }
          this.teamstoGroupsService.create(new TeamstoGroupsModel(teamstoGroupsModel)).subscribe(
            result => console.log(result),
            error => console.log(error)
          );
          ++teamIndex;
        });
        ++groupIndex;
      });
    }
  }

}
