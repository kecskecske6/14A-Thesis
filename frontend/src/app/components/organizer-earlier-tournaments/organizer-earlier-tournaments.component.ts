import { Component, OnInit } from '@angular/core';
import { TournamentModel } from 'src/app/models/Tournament';
import { UserPermissions } from 'src/app/models/UserPermissions';
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
  earlierTournaments: TournamentModel[] = [];
  organizer: string = '';

  constructor(private tournamentService: TournamentService, public auth: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.getTournaments();
    this.getOrganizerName();
  }
  getTournaments(): void {
    this.tournamentService.getAllByUserId(Number(this.auth.getId())).subscribe(
      (result: TournamentModel[]) => {
        result.forEach(t => {
          if (new Date(t.endDate).getTime() < new Date().getTime()) this.earlierTournaments.push(new TournamentModel(t));
          else this.tournaments.push(new TournamentModel(t));
        });
      },
      error => {
        console.log(error);
        if(error.status == 401){
          this.auth.logout();
        }
      });
  }

  getOrganizerName(): void {
    this.userService.getById(Number(this.auth.getId())).subscribe(
      result => this.organizer = result.name,
      error => console.log(error)
    );
  }
}
