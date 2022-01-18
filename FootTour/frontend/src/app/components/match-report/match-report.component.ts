import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/Player';
import { Match } from 'src/app/models/Match';
import { MatchService } from 'src/app/services/match.service';
import { PlayerService } from 'src/app/services/player.service';
import { UserService } from 'src/app/services/user.service';

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
  match!: Match;
  team1Players: Player[] = [];
  team2Players: Player[] = [];
  constructor(private matchService: MatchService, private playerService: PlayerService, private userService: UserService) { }

  ngOnInit(): void {
    this.getMatchById();
  }

  getMatchById(){
    this.matchService.getMatchById(this.id).subscribe(
      (result: any) =>{
        this.match = result;
        this.team1Name = result.team1Name;
        this.team2Name = result.team2Name;
        this.team1Goals = result.team1Goals;
        this.team2Goals = result.team2Goals;
        this.playerService.getPlayersByTeamId(result.team1Id).subscribe(
          result=>{
            this.team1Players = result;
          },
          error=>{
            console.log(error);
          }
        )
        this.playerService.getPlayersByTeamId(result.team2Id).subscribe(
          result=>{
            this.team2Players = result;
          },  
          error=>{
            console.log(error);
          }
        )
        this.userService.getNameById(result.refereeId).subscribe(
          result=>{
            this.refereeName = result;
          },
          error=>{
            console.log(error);
          }
        )
      },
      error=>{
        console.log(error);
      }
    )
  }

}
