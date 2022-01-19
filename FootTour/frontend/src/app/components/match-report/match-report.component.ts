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
        console.log(result);
      },
      error=>{
        console.log(error);
      }
    )
  }

}
