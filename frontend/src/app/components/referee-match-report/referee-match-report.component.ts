import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/Event';
import { MatchModel } from 'src/app/models/Match';
import { PlayerModel } from 'src/app/models/Player';
import { MatchService } from 'src/app/services/match.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { GroupModel } from 'src/app/models/Group';
import { GroupService } from 'src/app/services/group.service';
import { UserModel } from 'src/app/models/User';
import { TeamstoGroupsService } from 'src/app/services/teamsto-groups.service';
import { TeamstoGroupsModel } from 'src/app/models/TeamstoGroups';
import { TournamentService } from 'src/app/services/tournament.service';
import { TournamentModel } from 'src/app/models/Tournament';
import { TeamModel } from 'src/app/models/Team';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-referee-match-report',
  templateUrl: './referee-match-report.component.html',
  styleUrls: ['./referee-match-report.component.sass']
})
export class RefereeMatchReportComponent implements OnInit {

  id = 1;
  underModify = {
    team: 1,
    index: -1,
    type: "",
    modifying: false
  }
  minute: number = 1;
  tournamentName = "";
  tournamentId = 1;
  refereeName = "";
  team1Name = "";
  team2Name = "";
  team1Goals = 0;
  team2Goals = 0;
  team1Players: PlayerModel[] = [];
  team2Players: PlayerModel[] = [];
  event: EventModel = new EventModel();
  event2: EventModel = new EventModel();
  events: EventModel[] = [];
  match: MatchModel = new MatchModel();
  referees: UserModel[] = [];
  tournament: TournamentModel = new TournamentModel();

  constructor(private matchService: MatchService,
    private router: Router,
    private authService: AuthService, private groupService: GroupService, private userService: UserService, private teamstoGroupsService: TeamstoGroupsService, private tournamentService: TournamentService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.getMatchById();
  }

  getTournament() {
    this.tournamentService.getById(this.tournamentId).subscribe(
      result => this.tournament = result,
      error => console.log(error)
    );
  }

  getMatchById() {
    this.matchService.getMatchById(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      (result: any) => {
        this.id = result.id;
        this.match.id = result.id;
        this.match.team1Id = result.team1Id;
        this.match.team2Id = result.team2Id;
        this.match.code = result.code;
        this.match.refereeId = result.refereeId;
        this.refereeName = result.refereeName.name;
        this.tournamentName = result.tournamentName.name;
        this.tournamentId = result.tournamentId;
        console.log(result);
        this.team1Name = result.team1Name.name;
        this.team2Name = result.team2Name.name;
        this.team1Players = this.matchService.setPlayerProperties(result.team1Players);
        this.team2Players = this.matchService.setPlayerProperties(result.team2Players);
        this.getTournament();
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          this.authService.logout();
        }
      });
  }

  onSubmit() {
    this.match.id = this.id;
    this.match.team1Goals = this.team1Goals;
    this.match.team2Goals = this.team2Goals;
    this.userService.getByType('referee').subscribe(
      result => this.referees = result,
      error => console.log(error)
    );
    this.matchService.sendMatchReport(this.match).subscribe(
      resulti => {
        this.matchService.getByType(this.tournamentId, (this.match.code.split('-')[0].slice(0, this.match.code.split('-')[0].length - 1) + '%').startsWith('G') ? (this.match.code.split('-')[0].slice(0, this.match.code.split('-')[0].length - 1) + '%').slice(0, this.match.code.split('-')[0].length - 2) + '%' : this.match.code.split('-')[0].slice(0, this.match.code.split('-')[0].length - 1) + '%').subscribe(
          result => {
            if (!result[0].code.startsWith('G') && !result[0].code.startsWith('F')) {
              if (result.every(m => m.team1Goals != null)) {
                for (let i = 0; i < result.length; i += 2) {
                  let groupModel = new GroupModel();
                  groupModel.name = result[i].code.startsWith('R32') ? 'R16' + (i / 2 + 1) : result[i].code.startsWith('R16') ? 'QF' + (i / 2 + 1) : result[i].code.startsWith('QF') ? 'SF' + (i / 2 + 1) : 'F' + (i / 2 + 1);
                  groupModel.tournamentId = this.tournamentId;
                  this.groupService.create(groupModel).subscribe(
                    result2 => {
                      let matchModel = new MatchModel();
                      matchModel.code = result[i].code.startsWith('R32') ? 'R16' + (i / 2 + 1) + '-1' : result[i].code.startsWith('R16') ? 'QF' + (i / 2 + 1) + '-1' : result[i].code.startsWith('QF') ? 'SF' + (i / 2 + 1) + '-1' : 'F' + (i / 2 + 1) + '-1';
                      matchModel.groupId = result2.id;
                      matchModel.refereeId = this.referees[Math.floor(Math.random() * this.referees.length)].id;
                      matchModel.team1Goals = null;
                      matchModel.team1Id = result[i].team1Goals ?? 0 > (result[i].team2Goals ?? 0) ? result[i].team1Id : result[i].team2Id;
                      matchModel.team2Goals = null;
                      matchModel.team2Id = result[i + 1].team1Goals ?? 0 > (result[i + 1].team2Goals ?? 0) ? result[i + 1].team1Id : result[i + 1].team2Id;
                      this.matchService.create(matchModel).subscribe(
                        result3 => {
                          if (this.tournament.knockoutMatches == 2 && !result[0].code.startsWith('S') || this.tournament.finalMatches == 2 && result[0].code.startsWith('S')) {
                            matchModel = new MatchModel();
                            matchModel.code = result[i].code.startsWith('R32') ? 'R16' + (i / 2 + 1) + '-2' : result[i].code.startsWith('R16') ? 'QF' + (i / 2 + 1) + '-2' : result[i].code.startsWith('QF') ? 'SF' + (i / 2 + 1) + '-2' : 'F' + (i / 2 + 1) + '-2';
                            matchModel.groupId = result2.id;
                            matchModel.refereeId = this.referees[Math.floor(Math.random() * this.referees.length)].id;
                            matchModel.team1Goals = null;
                            matchModel.team1Id = result3.team2Id;
                            matchModel.team2Goals = null;
                            matchModel.team2Id = result3.team1Id;
                            this.matchService.create(matchModel).subscribe(
                              result4 => { },
                              error => console.log(error)
                            );
                          }
                          let teamstoGroupsModel = new TeamstoGroupsModel();
                          teamstoGroupsModel.groupId = result2.id;
                          teamstoGroupsModel.teamId = result3.team1Id;
                          this.teamstoGroupsService.create(teamstoGroupsModel).subscribe(
                            result4 => { },
                            error => console.log(error)
                          );
                          teamstoGroupsModel = new TeamstoGroupsModel();
                          teamstoGroupsModel.groupId = result2.id;
                          teamstoGroupsModel.teamId = result3.team2Id;
                          this.teamstoGroupsService.create(teamstoGroupsModel).subscribe(
                            result4 => { },
                            error => console.log(error)
                          );
                        },
                        error => console.log(error)
                      );
                    },
                    error => console.log(error)
                  );
                }
              }
            }
            else if (result[0].code.startsWith('G')) {
              if (result.every(m => m.team1Goals != null)) {
                this.groupService.getByType(this.tournamentId, 'GS%').subscribe(
                  resultGroups => {
                    this.teamstoGroupsService.getByTournamentId(this.tournamentId).subscribe(
                      resultTTG => {
                        const teamIds: number[] = [];
                        const teams: (TeamModel | undefined)[][] = [];
                        resultGroups.forEach(g => {
                          resultTTG.filter(t2g => t2g.groupId == g.id).forEach(t2g => teamIds.push(t2g.teamId));
                        });
                        this.teamService.getAllByTournamentId(this.tournamentId).subscribe(
                          resultTeams => {
                            const names = ['A', 'B', 'C', 'D'];
                            if (this.tournament.teamsCount == 32) names.push(...['E', 'F', 'G', 'H']);
                            names.forEach(n => {
                              const teamsCurrent: (TeamModel | undefined)[] = [];
                              resultTTG.filter(t2g => t2g.groupId == resultGroups.find(g => g.name == `GS${n}`)?.id).forEach(t2g => teamsCurrent.push(resultTeams.find(t => t.id == t2g.teamId)));
                              teams.push(teamsCurrent);
                            });
                            const orderedTeams: any[][] = [];
                            teams.forEach(g => {
                              let teamsCurrent: any[] = [];
                              g.forEach(t => {
                                const numberOfWins = result.filter(m => m.team1Goals != null && m.team2Goals != null && (m.team1Id == t?.id && m.team1Goals > m.team2Goals || m.team2Id == t?.id && m.team2Goals > m.team1Goals)).length;
                                const numberOfDraws = result.filter(m => m.team1Goals != null && m.team2Goals != null && ((m.team1Id == t?.id || m.team2Id == t?.id) && m.team2Goals == m.team1Goals)).length;
                                const matches = result.filter(m => (m.team1Id == t?.id || m.team2Id == t?.id));
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
                                teamsCurrent.push({
                                  id: t?.id,
                                  wins: numberOfWins,
                                  draws: numberOfDraws,
                                  goalsFor: numberOfGoals,
                                  goalsAgainst: numberOfReceivedGoals,
                                  points: numberOfWins * 3 + numberOfDraws
                                });
                              });
                              teamsCurrent = teamsCurrent.sort((a, b) => {
                                if (b.points - a.points != 0) return b.points - a.points > 0 ? 1 : -1;
                                if ((b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) != 0) return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst) > 0 ? 1 : -1;
                                if (b.goalsFor - a.goalsFor != 0) return b.goalsFor - a.goalsFor > 0 ? 1 : -1;
                                if (b.wins - a.wins != 0) return b.wins - a.wins > 0 ? 1 : -1;
                                return 0;
                              });
                              orderedTeams.push(teamsCurrent.slice(0, 2));
                            });
                            for (let i = 0; i < orderedTeams.length; i++) {
                              let groupModel = new GroupModel();
                              groupModel.name = this.tournament.teamsCount == 32 ? `R16${i}` : `QF${i}`;
                              groupModel.tournamentId = this.tournamentId;
                              this.groupService.create(groupModel).subscribe(
                                createdGroups => {
                                  let matchModel = new MatchModel();
                                  matchModel.code = this.tournament.teamsCount == 32 ? `R16${i}-1` : `QF${i}-1`;
                                  matchModel.groupId = createdGroups.id;
                                  matchModel.refereeId = this.referees[Math.floor(Math.random() * this.referees.length)].id;
                                  matchModel.team1Goals = null;
                                  matchModel.team1Id = orderedTeams[i][0].id;
                                  matchModel.team2Goals = null;
                                  matchModel.team2Id = i % 2 == 0 ? orderedTeams[i + 1][1].id : orderedTeams[i - 1][1].id;
                                  this.matchService.create(matchModel).subscribe(
                                    result3 => {
                                      if (this.tournament.knockoutMatches == 2) {
                                        matchModel = new MatchModel();
                                        matchModel.code = this.tournament.teamsCount == 32 ? `R16${i}-2` : `QF${i}-2`;
                                        matchModel.groupId = createdGroups.id;
                                        matchModel.refereeId = this.referees[Math.floor(Math.random() * this.referees.length)].id;
                                        matchModel.team1Goals = null;
                                        matchModel.team1Id = result3.team2Id;
                                        matchModel.team2Goals = null;
                                        matchModel.team2Id = result3.team1Id;
                                        this.matchService.create(matchModel).subscribe(
                                          result4 => { },
                                          error => console.log(error)
                                        );
                                      }
                                      let teamstoGroupsModel = new TeamstoGroupsModel();
                                      teamstoGroupsModel.groupId = createdGroups.id;
                                      teamstoGroupsModel.teamId = result3.team1Id;
                                      this.teamstoGroupsService.create(teamstoGroupsModel).subscribe(
                                        result4 => { },
                                        error => console.log(error)
                                      );
                                      teamstoGroupsModel = new TeamstoGroupsModel();
                                      teamstoGroupsModel.groupId = createdGroups.id;
                                      teamstoGroupsModel.teamId = result3.team2Id;
                                      this.teamstoGroupsService.create(teamstoGroupsModel).subscribe(
                                        result4 => { },
                                        error => console.log(error)
                                      );
                                    },
                                    error => console.log(error)
                                  );
                                },
                                error => console.log(error)
                              );
                            }
                          },
                          error => console.log(error)
                        );
                      },
                      error => console.log(error)
                    );
                  },
                  error => console.log(error)
                );
              }
            }
          },
          error => console.log(error)
        );
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          this.authService.logout();
        }
      }
    );
    this.matchService.sendEvents(this.events).subscribe(
      result => {
        console.log(result);
        this.router.navigate(["matchreport/", this.id]);
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          this.authService.logout();
        }
      }
    );
  }

  eventAssign(type: string, index: number, team: number) {
    this.underModify.type = type;
    this.underModify.index = index;
    this.underModify.modifying = true;
    this.underModify.team = team;
  }

  saveEvent(player: PlayerModel, type: string, teamName: string) {
    if (this.minute > 0 && this.minute < 120) {
      this.event = new EventModel;
      this.event.matchId = this.id;
      this.event.playerId = player.id;
      this.event.type = type;
      this.event.minute = this.minute;
      if (type == "goal") {
        player.number_of_goals_in_a_match.push(this.minute);
        if (teamName == this.team1Name) this.team1Goals++;
        else this.team2Goals++;
      }
      else if (type == "yellowCard") {
        player.number_of_yellows_in_a_match.push(this.minute);
        if (player.number_of_yellows_in_a_match.length == 2) {
          player.redCard = this.minute;
          this.event2.matchId = this.id;
          this.event2.playerId = player.id;
          this.event2.type = "redCard";
          this.event2.minute = this.minute;
          this.events.push(this.event2);
        }
      }
      else {
        player.redCard = this.minute;
      }
      this.events.push(this.event);
      console.log(this.events);
      this.stopModify();
    }
  }

  deleteEvent(player: PlayerModel, type: string, index: number, teamName: string) {
    if (type == "goal") {
      player.number_of_goals_in_a_match.splice(index, 1);
      if (teamName == this.team1Name) this.team1Goals--;
      else this.team2Goals--;
    }
    else if (type == "yellowCard") player.number_of_yellows_in_a_match.splice(index, 1);
    else {
      if (player.number_of_yellows_in_a_match.length == 2) player.number_of_yellows_in_a_match.splice(player.number_of_yellows_in_a_match.length - 1, 1);
      player.redCard = 0;
    }
    var toDelete = this.events.findIndex(element => element.type == type && element.playerId == player.id && element.minute == this.minute);
    this.events.splice(toDelete, 1);
  }

  stopModify() {
    this.underModify.modifying = false;
    this.underModify.index = -1;
    this.minute = 1;
    this.underModify.type = "";
  }
}
