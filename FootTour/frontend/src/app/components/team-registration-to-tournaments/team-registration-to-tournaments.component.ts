import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-team-registration-to-tournaments',
  templateUrl: './team-registration-to-tournaments.component.html',
  styleUrls: ['./team-registration-to-tournaments.component.sass']
})
export class TeamRegistrationToTournamentsComponent implements OnInit {

  players: Player [] = [];
  player2!: Player;
  player: Player = new Player();
  number: number = 0;
  name: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  savePlayer(){
    if(this.name != "" && this.number > 0 && this.number < 99){
      this.player.kit_number = this.number;
      this.player.name = this.name;
      this.players.push(this.player);
      this.number = 0;
      this.name = "";
    }
    else{
      console.log("Rosszu")
      //TODO helytelen adat alert
    }
  }

}
