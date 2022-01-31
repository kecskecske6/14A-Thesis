import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupModel } from 'src/app/models/Group';
import { TeamModel } from 'src/app/models/Team';
import { TeamstoGroupsModel } from 'src/app/models/TeamstoGroups';
import { GroupService } from 'src/app/services/group.service';
import { TeamService } from 'src/app/services/team.service';
import { TeamstoGroupsService } from 'src/app/services/teamsto-groups.service';

@Component({
  selector: 'app-tournament-schedule',
  templateUrl: './tournament-schedule.component.html',
  styleUrls: ['./tournament-schedule.component.sass']
})
export class TournamentScheduleComponent implements OnInit {

  teamstoGroups: TeamstoGroupsModel[] = [];

  teams: TeamModel[] = [];

  groups: GroupModel[] = [];

  pairs1: (TeamModel | undefined)[] = [];

  pairs2: (TeamModel | undefined)[] = [];

  constructor(private teamstoGroupsService: TeamstoGroupsService, private router: Router, private teamService: TeamService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.getTeamstoGroups();
    this.getTeams();
    this.getGroups();
  }

  getTeamstoGroups(): void {
    this.teamstoGroupsService.getByTournamentId(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      result => {
        result.forEach(ttg => {
          this.teamstoGroups.push(new TeamstoGroupsModel(ttg));
        });
      },
      error => console.log(error)
    );
    console.log(this.teamstoGroups);
  }

  getTeams(): void {
    this.teamService.getAllByTournamentId(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      result => {
        result.forEach(t => {
          this.teams.push(new TeamModel(t));
        });
      },
      error => console.log(error)
    );
    console.log(this.teams);
  }

  getGroups(): void {
    this.groupService.getByTournamentId(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      result => {
        result.forEach(g => {
          this.groups.push(new GroupModel(g));
        });
      },
      error => console.log(error)
    );
    console.log(this.groups);
  }

  getPairs(): void {
    for (let j = 0; j < this.teamstoGroups.length; j++)
      if (j % 2 == 0) this.pairs1.push(this.teams.find(t => t.id == this.teamstoGroups[j].teamId));
      else this.pairs2.push(this.teams.find(t => t.id == this.teamstoGroups[j].teamId));
  }

  getTeam(pair: GroupModel): string {
    let teams = '';
    this.teamstoGroups.filter(ttg => ttg.groupId == pair.id).forEach(ttg => {
      teams += this.teams.find(t => t.id == ttg.teamId)?.name + '\n';
    });
    return teams;
  }

}
