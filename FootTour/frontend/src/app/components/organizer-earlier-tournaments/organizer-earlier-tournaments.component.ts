import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TournamentModel } from 'src/app/models/Tournament';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-organizier-earlier-tournaments',
  templateUrl: './organizer-earlier-tournaments.component.html',
  styleUrls: ['./organizer-earlier-tournaments.component.sass']
})
export class OrganizerEarlierTournamentsComponent implements OnInit {

  tournaments: TournamentModel[] = [];

  constructor(private http: HttpClient, private tournamentService: TournamentService, private userService: UserService) {}

  ngOnInit(): void {
    this.getTournament();
  }
  getTournament() : void{
    this.tournamentService.getByOrganizerId(this.userService.getUserId()).subscribe(result=>{
        this.tournaments = [];
        result.forEach(r => this.tournaments.push(new TournamentModel(r)));
        this.tournaments.forEach(t => console.log(t));
      },
      error=>{
        console.log(error);
      });
  }
}
