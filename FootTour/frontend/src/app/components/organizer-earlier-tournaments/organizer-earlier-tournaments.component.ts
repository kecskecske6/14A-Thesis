import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { TournamentModel } from 'src/app/models/Tournament';
import { AuthService } from 'src/app/services/auth.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-organizer-earlier-tournaments',
  templateUrl: './organizer-earlier-tournaments.component.html',
  styleUrls: ['./organizer-earlier-tournaments.component.sass']
})
export class OrganizerEarlierTournamentsComponent implements OnInit {

  tournaments: TournamentModel[] = [];
  organizer: string = '';

  constructor(private http: HttpClient, private tournamentService: TournamentService, private auth: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.getTournaments();
    this.getOrganizerName();
  }
  getTournaments(): void {
    this.tournamentService.getAllByUserId(Number(this.auth.getId())).subscribe(
      (result: TournamentModel[]) => {
        result.forEach(t => {
          this.tournaments.push(new TournamentModel(t));
        });
      },
      error => {
        console.log(error);
      });
      console.log(this.tournaments);
  }

  getOrganizerName(): void {
    this.userService.getById(Number(this.auth.getId())).subscribe(
      result => this.organizer = result,
      error => console.log(error)
    );
  }
}
