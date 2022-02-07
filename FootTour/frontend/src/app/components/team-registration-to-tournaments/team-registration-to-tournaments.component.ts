import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-team-registration-to-tournaments',
  templateUrl: './team-registration-to-tournaments.component.html',
  styleUrls: ['./team-registration-to-tournaments.component.sass']
})
export class TeamRegistrationToTournamentsComponent implements OnInit {

  players: Player [] = []; 

  constructor() { }

  ngOnInit(): void {
  }

}
