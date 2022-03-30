import { Component, OnInit } from '@angular/core';
import { TournamentModel } from 'src/app/models/Tournament';
import { AuthService } from 'src/app/services/auth.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-available-tournaments',
  templateUrl: './available-tournaments.component.html',
  styleUrls: ['./available-tournaments.component.sass']
})
export class AvailableTournamentsComponent implements OnInit {

  tournaments: TournamentModel[] = [];
  organizers: string[] = [];

  constructor(private tournamentService: TournamentService, private userService: UserService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getTournaments();
  }

  getTournaments(): void {
    this.tournamentService.getAll().subscribe(
      (data: TournamentModel[]) => {
        data.forEach(t => {
          this.tournaments.push(new TournamentModel(t));
          this.getOrganizerName(t.organizerId);
        });
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          this.auth.logout();
        }
      }
    );
  }

  getOrganizerName(id: number): void {
    this.userService.getById(id).subscribe(
      result => this.organizers.push(result.name),
      error => console.log(error)
    );
  }

}
