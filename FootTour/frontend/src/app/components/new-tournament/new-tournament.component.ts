import { Component, OnInit } from '@angular/core';
import { TournamentModel } from 'src/app/models/Tournament';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.sass']
})
export class NewTournamentComponent implements OnInit {

  tournamentModel = {
    name: '',
    location: {
      postalCode: 0,
      city: '',
      street: ''
    },
    description: '',
    startDate: new Date(),
    startTime: new Date().getTime(),
    finalDate: new Date(),
    finalTime: new Date().getTime()
  }

  constructor() { }

  ngOnInit(): void {
  }

}
