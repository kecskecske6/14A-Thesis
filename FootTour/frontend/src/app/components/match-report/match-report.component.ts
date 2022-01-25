import { Component, OnInit } from '@angular/core';
import { PlayerModel } from 'src/app/models/Player';
import { MatchModel } from 'src/app/models/Match';
import { MatchService } from 'src/app/services/match.service';
import { PlayerService } from 'src/app/services/player.service';
import { UserService } from 'src/app/services/user.service';
import { Event } from 'src/app/interfaces/event';

@Component({
  selector: 'app-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.sass']
})
export class MatchReportComponent implements OnInit {
  team1Name= "";
  team2Name = "";
  refereeName = "";
  team1Goals = -1;
  team2Goals = -2;
  tournamentName = "Lébény Kupa"; //TODO
  id = 1;
  match!: MatchModel;
  team1Players: PlayerModel[] = [];
  team2Players: PlayerModel[] = [];
  team1PlayersWithEvents: PlayerModel[] = [];
  team2PlayersWithEvents: PlayerModel[] =[];
  events: Event[] = [];

  constructor(private matchService: MatchService, private playerService: PlayerService, private userService: UserService) { }

  ngOnInit(): void {
    this.getMatchById();
  }

  getMatchById(){
    this.matchService.getMatchById(this.id).subscribe(
      (result: any) =>{
        console.log(result);
        this.team1Name = result.team1Name.name;
        this.team2Name = result.team2Name.name;
        this.team1Goals = result.team1Goals;
        this.team2Goals = result.team2Goals;
        this.team1Players = result.team1Players;
        this.team2Players = result.team2Players;
        this.refereeName = result.refereeName.name;
        this.tournamentName = result.tournamentName.name;
        this.events = result.events;
        this.team1PlayersWithEvents = this.matchService.setEventsToPlayers(this.events, this.team1Players);
        this.team2PlayersWithEvents = this.matchService.setEventsToPlayers(this.events, this.team2Players)
      },
      error=>{
        console.log(error);
      }
    )
  }

}
