import { Component, OnInit } from '@angular/core';
import { event } from 'src/app/models/Event';
import { Match } from 'src/app/models/Match';
import { Player } from 'src/app/models/Player';
import { MatchService } from 'src/app/services/match.service';
import { AuthService} from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
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
  refereeName = "";
  team1Name = "";
  team2Name = "";
  team1Goals = 0;
  team2Goals = 0;
  team1Players: Player[] = [];
  team2Players: Player[] = [];
  event: event = new event();
  event2: event = new event();
  events: event[] = [];
  match: Match = new Match();
  
  constructor(private matchService: MatchService,
              private router: Router, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getMatchById();
  }

  getMatchById(){
    this.matchService.getMatchById(this.id).subscribe(
      (result: any)=>{
      this.match.id = result.id;
      this.match.tournamentId = result.tournamentId;
      this.match.team1Id = result.team1Id;
      this.match.team2Id = result.team2Id;
      this.match.code = result.code;
      this.match.refereeId = result.refereeId;
      this.refereeName = result.refereeName.name;
      console.log(result);
      this.team1Name = result.team1Name.name;
      this.team2Name = result.team2Name.name;
      this.team1Players = this.matchService.setPlayerProperties(result.team1Players);
      this.team2Players = this.matchService.setPlayerProperties(result.team2Players);
    },
    error=>{
      console.log(error);
    });
  }

  onSubmit(){
    this.match.id = this.id;
    this.match.team1Goals = this.team1Goals;
    this.match.team2Goals = this.team2Goals;
    this.matchService.sendMatchReport(this.match).subscribe(
      result =>console.log(result),
      error=> console.log(error)
    );
    this.matchService.sendEvents(this.events).subscribe(
      result =>{ 
        console.log(result);
        this.router.navigate(["matchreport/", this.id]);
      },
      error => {
        console.log(error);
        this.router.navigate(["matchreport/", this.id]);
      }
    );
  }

  eventAssign(type: string, index: number, team: number){
    this.underModify.type = type;
    this.underModify.index = index;
    this.underModify.modifying = true;
    this.underModify.team = team;
  }

  saveEvent(player: Player, type: string, teamName: string){
    if(this.minute > 0 && this.minute < 120){
      this.event = new event;
      this.event.match_id = this.id;
      this.event.player_id = player.id;
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
           this.event2.match_id = this.id;
           this.event2.player_id = player.id;
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
    this.stopModify(player);
    }
  }

  deleteEvent(player: Player, type: string, index: number, teamName: string){
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
    var toDelete = this.events.findIndex(element => element.type == type && element.player_id == player.id && element.minute == this.minute);
    this.events.splice(toDelete, 1);
  }

  stopModify(player: Player){
      this.underModify.modifying = false;
      this.underModify.index = -1;
      this.minute = 1;
      this.underModify.type = "";
  }
}
