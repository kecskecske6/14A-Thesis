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

  groupsR32: GroupModel[] = [];

  groupsR16: GroupModel[] = [];

  groupsQF: GroupModel[] = [];

  groupsSF: GroupModel[] = [];

  groupsF: GroupModel[] = [];

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
    this.groupService.getByType(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1)), 'R32%').subscribe(
      result => result.forEach(g => this.groupsR32.push(new GroupModel(g))),
      error => console.log(error)
    );
    this.groupService.getByType(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1)), 'R16%').subscribe(
      result => result.forEach(g => this.groupsR16.push(new GroupModel(g))),
      error => console.log(error)
    );
    this.groupService.getByType(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1)), 'QF%').subscribe(
      result => result.forEach(g => this.groupsQF.push(new GroupModel(g))),
      error => console.log(error)
    );
    this.groupService.getByType(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1)), 'SF%').subscribe(
      result => result.forEach(g => this.groupsSF.push(new GroupModel(g))),
      error => console.log(error)
    );
    this.groupService.getByType(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1)), 'F%').subscribe(
      result => result.forEach(g => this.groupsF.push(new GroupModel(g))),
      error => console.log(error)
    );
  }

  getTournament(): void {
    this.tournamentService.getById(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      result => this.tournament = new TournamentModel(result),
      error => console.log(error)
    );
  }

  getTeam(id: number): string {
    return this.teams.find(t => t.id == this.matches.filter(m => m.groupId == id)[0].team1Id)?.name + '\n' + this.teams.find(t => t.id == this.matches.filter(m => m.groupId == id)[0].team2Id)?.name;
  }

  getGoals(id: number, no: number): string {
    return this.matches.filter(m => m.groupId == id)[no].team1Goals + '\n' + this.matches.filter(m => m.groupId == id)[no].team2Goals;
  }

  getOverallGoals(id: number): string {
    return this.matches.filter(m => m.groupId == id)[0].team1Goals + this.matches.filter(m => m.groupId == id)[1].team1Goals + '\n' + (this.matches.filter(m => m.groupId == id)[0].team2Goals + this.matches.filter(m => m.groupId == id)[1].team2Goals);
  }

  getMatchId(id: number): string {
    return this.matches.filter(m => m.groupId == id)[0].id + '\n' + this.matches.filter(m => m.groupId == id)[1].id;
  }

}
