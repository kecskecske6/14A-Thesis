import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/interfaces/tournament';
import { AuthService } from 'src/app/services/auth.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-available-tournaments',
  templateUrl: './available-tournaments.component.html',
  styleUrls: ['./available-tournaments.component.sass']
})
export class AvailableTournamentsComponent implements OnInit {

  tournaments: Tournament[] = [];

  constructor(private authService: AuthService, private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.getTournaments();
  }

  getTournaments(): void {
    this.tournamentService.getAll().subscribe(
      (data: Tournament[]) => this.tournaments = data,
      error=>{
        console.log(error);
        if(error.status == 401){
          this.authService.logout();
        }
      }
    );
  }

}
