import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player';
import { TournamentModel } from 'src/app/models/Tournament';
import { PlayerService } from 'src/app/services/player.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.sass']
})
export class AwardsComponent implements OnInit {

  players: Player[] = [];

  tournament: TournamentModel = new TournamentModel();

  constructor(private playerService: PlayerService, private router: Router, private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.getPlayers();
    this.getTournamentInfo();
  }

  getPlayers(): void {
    this.playerService.getPlayersByTournamentId(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      result => this.players = result,
      error => console.log(error)
    );
  }

  getTournamentInfo(): void {
    this.tournamentService.getById(Number(this.router.url.substring(this.router.url.lastIndexOf('/') + 1))).subscribe(
      result => this.tournament = result,
      error => console.log(error)
    );
  }

  send(): void {
    this.tournamentService.modify(this.tournament).subscribe(
      result => console.log(result),
      error => console.log(error)
    );
    this.router.navigate(['/schedule/' + this.router.url.substring(this.router.url.lastIndexOf('/') + 1)]);
  }

}
