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

  loaded: Promise<boolean> = Promise.resolve(false);

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
      result => {
        result.forEach(m => this.matches.push(new MatchModel(m)));
        this.loaded = Promise.resolve(true);
      },
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
    this.groupService.getByType(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1)), 'GS%').subscribe(
      result => result.forEach(g => this.groups.push(new GroupModel(g))),
      error => console.log(error)
    );
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
    return this.matches.filter(m => m.groupId == id)[0].team1Goals?.toString() ?? '-' + this.matches.filter(m => m.groupId == id)[1].team1Goals?.toString() ?? '-' + '\n' + (this.matches.filter(m => m.groupId == id)[0].team2Goals?.toString() ?? '-' + this.matches.filter(m => m.groupId == id)[1].team2Goals?.toString() ?? '-');
  }

  getMatchId(id: number): string {
    return this.matches.filter(m => m.groupId == id)[0].id + '\n' + this.matches.filter(m => m.groupId == id)[1].id;
  }

  getMatchesByGroupId(id: number): MatchModel[] {
    return this.matches.filter(m => m.groupId == id);
  }

  getTeamById(id: number): string | undefined {
    return this.teams.find(t => t.id == id)?.name;
  }

  getTeamsByGroupId(id: number): any[] {
    const teamIds: number[] = [];
    const teams: (TeamModel | undefined)[] = [];
    this.teamstoGroups.filter(ttg => ttg.groupId == id).forEach(ttg => teamIds.push(ttg.teamId));
    teamIds.forEach(tid => teams.push(this.teams.find(t => t.id == tid)));
    const stats: any[] = [];
    teams.forEach(t => {
      const numberOfMatches = this.matches.filter(m => (m.team1Id == t?.id || m.team2Id == t?.id) && m.team1Goals != null).length;
      const numberOfWins = this.matches.filter(m => m.team1Goals != null && m.team2Goals != null && (m.team1Id == t?.id && m.team1Goals > m.team2Goals || m.team2Id == t?.id && m.team2Goals > m.team1Goals)).length;
      const numberOfDraws = this.matches.filter(m => m.team1Goals != null && m.team2Goals != null && ((m.team1Id == t?.id || m.team2Id == t?.id) && m.team2Goals == m.team1Goals)).length;
      const numberOfLosses = numberOfMatches - numberOfWins - numberOfDraws;
      const matches = this.matches.filter(m => (m.team1Id == t?.id || m.team2Id == t?.id) && m.team1Goals != null);
      let numberOfGoals = 0;
      let numberOfReceivedGoals = 0;
      matches.forEach(m => {
        if (m.team1Id == t?.id) {
          numberOfGoals += m.team1Goals ?? 0;
          numberOfReceivedGoals += m.team2Goals ?? 0;
        }
        else {
          numberOfGoals += m.team2Goals ?? 0;
          numberOfReceivedGoals += m.team1Goals ?? 0;
        }
      });
      stats.push({
        name: t?.name,
        matches: numberOfMatches,
        wins: numberOfWins,
        draws: numberOfDraws,
        losses: numberOfLosses,
        goalsFor: numberOfGoals,
        goalsAgainst: numberOfReceivedGoals,
        points: numberOfWins * 3 + numberOfDraws
      });
    });
    return stats.sort((a, b) => b.points - a.points).sort((a, b) => (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst)).sort((a, b) => b.goalsFor - a.goalsFor).sort((a, b) => b.wins - a.wins);
  }

}
