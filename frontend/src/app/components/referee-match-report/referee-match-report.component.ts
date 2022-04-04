import { Component, OnInit } from '@angular/core';
import { EventModel } from 'src/app/models/Event';
import { MatchModel } from 'src/app/models/Match';
import { PlayerModel } from 'src/app/models/Player';
import { MatchService } from 'src/app/services/match.service';
import { AuthService} from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
  
  constructor(private matchService: MatchService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getMatchById();
  }

  getMatchById(){
    this.matchService.getMatchById(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      (result: any)=>{
      this.match.id = result.id;
      this.match.team1Id = result.team1Id;
      this.match.team2Id = result.team2Id;
      this.match.code = result.code;
      this.match.refereeId = result.refereeId;
      this.refereeName = result.refereeName.name;
      this.tournamentName = result.tournamentName.name;
      console.log(result);
      this.team1Name = result.team1Name.name;
      this.team2Name = result.team2Name.name;
      this.team1Players = this.matchService.setPlayerProperties(result.team1Players);
      this.team2Players = this.matchService.setPlayerProperties(result.team2Players);
    },
    error=>{
      console.log(error);
      if(error.status == 401){
        this.authService.logout();
      }
    });
  }

  onSubmit(){
    this.match.id = this.id;
    this.match.team1Goals = this.team1Goals;
    this.match.team2Goals = this.team2Goals;
    this.matchService.sendMatchReport(this.match).subscribe(
      result =>console.log(result),
      error=>{
        console.log(error);
        if(error.status == 401){
          this.authService.logout();
        }
      }
    );
    this.matchService.sendEvents(this.events).subscribe(
      result =>{ 
        console.log(result);
        this.router.navigate(["matchreport/", this.id]);
      },
      error=>{
        console.log(error);
        if(error.status == 401){
          this.authService.logout();
        }
      }
    );
  }

  eventAssign(type: string, index: number, team: number){
    this.underModify.type = type;
    this.underModify.index = index;
    this.underModify.modifying = true;
    this.underModify.team = team;
  }

  saveEvent(player: PlayerModel, type: string, teamName: string){
    if(this.minute > 0 && this.minute < 120){
      this.event = new EventModel;
      this.event.matchId = this.id;
      this.event.playerId = player.id;
      this.event.type = type;
      this.event.minute = this.minute;
      if(type == "goal"){
        player.number_of_goals_in_a_match.push(this.minute);
        if(teamName == this.team1Name) this.team1Goals++;
        else this.team2Goals++;
      }
      else if(type == "yellowCard"){
        player.number_of_yellows_in_a_match.push(this.minute);
        if(player.number_of_yellows_in_a_match.length == 2){
           player.redCard = this.minute;
           this.event2.matchId = this.id;
           this.event2.playerId = player.id;
           this.event2.type = "redCard";
           this.event2.minute = this.minute;
           this.events.push(this.event2);
          }
      } 
      else{
        player.redCard = this.minute;
      }
    this.events.push(this.event);
    console.log(this.events);
    this.stopModify();
    }
  }

  deleteEvent(player: PlayerModel, type: string, index: number, teamName: string){
    if(type == "goal"){
      player.number_of_goals_in_a_match.splice(index, 1);
      if(teamName == this.team1Name) this.team1Goals--;
      else this.team2Goals--;
    }
    else if(type == "yellowCard") player.number_of_yellows_in_a_match.splice(index,1);
    else {
      if(player.number_of_yellows_in_a_match.length == 2) player.number_of_yellows_in_a_match.splice(player.number_of_yellows_in_a_match.length-1, 1);
      player.redCard = 0;
    }
    var toDelete = this.events.findIndex(element => element.type == type && element.playerId == player.id && element.minute == this.minute);
    this.events.splice(toDelete, 1);
  }

  stopModify(){
      this.underModify.modifying = false;
      this.underModify.index = -1;
      this.minute = 1;
      this.underModify.type = "";
  }
}
