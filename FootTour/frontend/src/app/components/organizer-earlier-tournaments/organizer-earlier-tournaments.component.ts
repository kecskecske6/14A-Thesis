import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/interfaces/tournament';
import { AuthService } from 'src/app/services/auth.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-organizer-earlier-tournaments',
  templateUrl: './organizer-earlier-tournaments.component.html',
  styleUrls: ['./organizer-earlier-tournaments.component.sass']
})
export class OrganizerEarlierTournamentsComponent implements OnInit {

  tournaments: Tournament[] = [];

  constructor(private tournamentService: TournamentService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getTournaments();
  }
  getTournaments() : void{
    this.tournamentService.getAllByUserId(Number(this.authService.getId())).subscribe(
      (result: Tournament[])=>{
        this.tournaments = result;
      },
      error=>{
        console.log(error);
        if(error.status == 401){
          this.authService.logout();
        }
      });
  }
}
