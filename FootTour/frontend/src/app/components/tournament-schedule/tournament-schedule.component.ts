import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupModel } from 'src/app/models/Group';
import { MatchModel } from 'src/app/models/Match';
import { TeamModel } from 'src/app/models/Team';
import { TeamstoGroupsModel } from 'src/app/models/TeamstoGroups';
import { TournamentModel } from 'src/app/models/Tournament';
import { GroupService } from 'src/app/services/group.service';
import { MatchService } from 'src/app/services/match.service';
import { TeamService } from 'src/app/services/team.service';
import { TeamstoGroupsService } from 'src/app/services/teamsto-groups.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournament-schedule',
  templateUrl: './tournament-schedule.component.html',
  styleUrls: ['./tournament-schedule.component.sass']
})
export class TournamentScheduleComponent implements OnInit {

  teamstoGroups: TeamstoGroupsModel[] = [];

  teams: TeamModel[] = [];

  groups: GroupModel[] = [];

  tournament: TournamentModel = new TournamentModel();

  matches: MatchModel[] = [];

  constructor(private teamstoGroupsService: TeamstoGroupsService, private router: Router, private teamService: TeamService, private groupService: GroupService, private tournamentService: TournamentService, private matchService: MatchService) { }

  ngOnInit(): void {
    this.getTeamstoGroups();
    this.getTeams();
    this.getGroups();
    this.getTournament();
    this.getMatches();
  }

  getMatches(): void {
    this.matchService.getByTournamentId(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      result => result.forEach(m => this.matches.push(new MatchModel(m))),
      error => console.log(error)
    );
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
  }

  getTournament(): void {
    this.tournamentService.getById(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      result => this.tournament = new TournamentModel(result),
      error => console.log(error)
    );
  }

  getTeam(pair: GroupModel): string {
    let teams = '';
    this.teamstoGroups.filter(ttg => ttg.groupId == pair.id).forEach(ttg => {
      teams += this.teams.find(t => t.id == ttg.teamId)?.name + '\n';
    });
    return teams;
  }

}
