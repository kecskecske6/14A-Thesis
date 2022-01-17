import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/Match';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.sass']
})
export class MatchReportComponent implements OnInit {
  
  id = 0;
  match!: Match;
  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
    this.getMatchById();
  }

  getMatchById(){
    this.matchService.getMatchById(this.id).subscribe(
      (result: Match) =>{
        this.match = result;
      },
      error=>{
        console.log(error);
      }
    )
  }

}
