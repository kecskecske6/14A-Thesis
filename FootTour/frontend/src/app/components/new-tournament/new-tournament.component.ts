import { Component, OnInit } from '@angular/core';
import { TournamentModel } from 'src/app/models/Tournament';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.sass']
})
export class NewTournamentComponent implements OnInit {

  tournamentModel = {
    name: '',
    location: {
      postalCode: 9021,
      city: '',
      street: ''
    },
    description: '',
    startDate: new Date(),
    startTime: new Date().getTime(),
    finalDate: new Date(),
    finalTime: new Date().getTime(),
    entryFee: 0,
    teamsCount: 8,
    type: 'Egyenes kieséses'
  }

  constructor(private tournamentService: TournamentService) { }

  ngOnInit(): void {
  }

  create(): void {
    
  }

}
