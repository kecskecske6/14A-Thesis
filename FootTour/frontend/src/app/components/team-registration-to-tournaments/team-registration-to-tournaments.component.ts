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
  teamName: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  savePlayer(){
    if(this.name != "" && this.number > 0 && this.number < 99){
      if(!this.checkDuplicateNumbers()){
        this.player.kit_number = this.number;
        this.player.name = this.name;
        this.players.push(this.player);
        this.player = new Player();
        this.number = 0;
        this.name = "";
        console.log(this.players);
      }
      else{
        console.log("Már létezik ilyen mezszámú játékos!");
      }
    }
    else{
      console.log("Rosszu")
      //TODO helytelen adat alert
    }
  }

  deletePlayer(index: number){
    this.players.splice(index,1);
  }

  checkDuplicateNumbers(){
    if(this.players.some(p => p.kit_number === this.number)) return true;
    return false;
  }

}
