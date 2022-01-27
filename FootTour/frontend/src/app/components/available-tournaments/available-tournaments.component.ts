import { Component, OnInit } from '@angular/core';
import { TournamentModel } from 'src/app/models/Tournament';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-available-tournaments',
  templateUrl: './available-tournaments.component.html',
  styleUrls: ['./available-tournaments.component.sass']
})
export class AvailableTournamentsComponent implements OnInit {

  tournaments: TournamentModel[] = [];

  constructor(private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.getTournaments();
  }

  getTournaments(): void {
    this.tournamentService.getAll().subscribe(
      (data: TournamentModel[]) => {
        data.forEach(t => {
          this.tournaments.push(new TournamentModel(t));
        });
      },
      err => console.log(err)
    );
  }

}
