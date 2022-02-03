import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/interfaces/team';
import { GroupModel } from 'src/app/models/Group';
import { MatchModel } from 'src/app/models/Match';
import { TeamstoGroupsModel } from 'src/app/models/TeamstoGroups';
import { TournamentModel } from 'src/app/models/Tournament';
import { UserModel } from 'src/app/models/User';
import { GroupService } from 'src/app/services/group.service';
import { MatchService } from 'src/app/services/match.service';
import { TeamService } from 'src/app/services/team.service';
import { TeamstoGroupsService } from 'src/app/services/teamsto-groups.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.sass']
})
export class DrawComponent implements OnInit {

  tournament = new TournamentModel();

  teams: Team[] = [];

  groups: GroupModel[] = [];

  referees: UserModel[] = [];

  teamstoGroups: TeamstoGroupsModel[] = [];

  constructor(private router: Router, private tournamentService: TournamentService, private teamService: TeamService, private groupService: GroupService, private teamstoGroupsService: TeamstoGroupsService, private matchService: MatchService, private userService: UserService) { }

  ngOnInit(): void {
    this.getTournamentInfo();
    this.getTeams();
    this.getReferees();
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
      this.saveGroups(groups);
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
        };
        await this.groupService.create(new GroupModel(model)).toPromise().then(a => {
          this.groups.push(new GroupModel(a));
        });
        g.forEach(async t => {
          let teamIndex = 0;
          const teamstoGroupsModel = {
            team_id: t.id,
            group_id: this.groups[groupIndex].id
          };
          await this.teamstoGroupsService.create(new TeamstoGroupsModel(teamstoGroupsModel)).toPromise().then(result => {
            this.teamstoGroups.push(new TeamstoGroupsModel(result));
          });
          ++teamIndex;
        });
        ++groupIndex;
      });
      this.createMatches(groups);
    }
    else {
      const groupLetters = ['A', 'B', 'C', 'D'];
      if (this.tournament.teamsCount == 32 && this.tournament.groupsAmount == 4) {
        const groupLetters2 = ['E', 'F', 'G', 'H'];
        groupLetters.push(...groupLetters2);
      }
      let i = -1;
      let groupIndex = 0;
      groups.forEach(async g => {
        let name = `GS${groupLetters[++i]}`;
        const model = {
          tournament_id: this.router.url.substring(this.router.url.lastIndexOf('/') + 1),
          name: name
        };
        await this.groupService.create(new GroupModel(model)).toPromise().then(a => {
          this.groups.push(new GroupModel(a));
        });
        g.forEach(t => {
          let teamIndex = 0;
          const teamstoGroupsModel = {
            team_id: t.id,
            group_id: this.groups[groupIndex].id
          };
          this.teamstoGroupsService.create(new TeamstoGroupsModel(teamstoGroupsModel)).subscribe(
            result => this.teamstoGroups.push(new TeamstoGroupsModel(result)),
            error => console.log(error)
          );
          ++teamIndex;
        });
        ++groupIndex;
      });
    }
  }

  createMatches(groups: Team[][]): void {
    if (groups[0].length == 2) {
      this.groups.forEach(g => {
        const orderedTeams: number[] = [];
        for (let i = 0; i < 2; i++) {
          let team, doAgain;
          do {
            team = this.teams.filter(t => t.id == this.teamstoGroups.filter(ttg => ttg.groupId == g.id)[Math.floor(Math.random() * this.teamstoGroups.filter(ttg => ttg.groupId == g.id).length)].teamId)[Math.floor(Math.random() * this.teams.filter(t => t.id == this.teamstoGroups.filter(ttg => ttg.groupId == g.id)[Math.floor(Math.random() * this.teamstoGroups.filter(ttg => ttg.groupId == g.id).length)].teamId).length)].id;
            doAgain = false;
            for (let j = 0; j < orderedTeams.length; j++) if (orderedTeams[j] == team) doAgain = true;
          } while (doAgain);
          orderedTeams.push(team);
        }
        const model = {
          referee_id: this.referees[Math.floor(Math.random() * this.referees.length)].id,
          team1_id: orderedTeams[0],
          team2_id: orderedTeams[1],
          team1_goals: 0,
          team2_goals: 0,
          code: `${g.name}-1`,
          group_id: g.id,
          time: new Date()
        };
        this.matchService.create(new MatchModel(model)).subscribe(
          result => console.log(result),
          error => console.log(error)
        );
        if (this.tournament.knockoutMatches == 2) {
          const model = {
            referee_id: this.referees[Math.floor(Math.random() * this.referees.length)].id,
            team1_id: orderedTeams[1],
            team2_id: orderedTeams[0],
            team1_goals: 0,
            team2_goals: 0,
            code: `${g.name}-2`,
            group_id: g.id,
            time: new Date()
          };
          this.matchService.create(new MatchModel(model)).subscribe(
            result => console.log(result),
            error => console.log(error)
          );
        }
      });
    }
  }

  getReferees(): void {
    this.userService.getByType('referee').subscribe(
      result => result.forEach(r => this.referees.push(new UserModel(r))),
      error => console.log(error)
    );
  }

}
