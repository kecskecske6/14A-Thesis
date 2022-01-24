import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Player } from 'src/app/models/Player';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-referee-match-report',
  templateUrl: './referee-match-report.component.html',
  styleUrls: ['./referee-match-report.component.sass']
})
export class RefereeMatchReportComponent implements OnInit {

  id = 1;
  matchreport!: FormGroup;
  team1Name = "";
  team2Name = "";
  team1Players: Player[] = [];
  team2Players: Player[] = [];
  
  constructor(private fb: FormBuilder, private matchService: MatchService) { }

  ngOnInit(): void {
    this.getMatchById();
    this.matchreport = this.fb.group({
      team1Score: [0],
      team2Score: [0]
    });
  }

  getMatchById(){
    this.matchService.getMatchById(this.id).subscribe(
      (result: any)=>{
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
    console.log(this.matchreport.controls.team1Score.value);
  }

  yellowAdd(player: Player){
    player.yellow_cards++;
  }

  redAdd(player: Player){
    player.red_cards++;
  }
}
