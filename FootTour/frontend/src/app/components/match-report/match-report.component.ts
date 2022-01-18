import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/Match';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.sass']
})
export class MatchReportComponent implements OnInit {
  team1Name= "";
  team2Name = "";
  team1Goals = -1;
  team2Goals = -2;
  id = 1;
  match!: Match;
  players = [];
  constructor(private matchService: MatchService) { }

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
        this.players = result.players;
        console.log(result);
      },
      error=>{
        console.log(error);
      }
    )
  }

}
