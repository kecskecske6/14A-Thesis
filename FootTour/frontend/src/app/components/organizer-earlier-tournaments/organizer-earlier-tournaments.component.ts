import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models/tournament';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-organizer-earlier-tournaments',
  templateUrl: './organizer-earlier-tournaments.component.html',
  styleUrls: ['./organizer-earlier-tournaments.component.sass']
})
export class OrganizerEarlierTournamentsComponent implements OnInit {

  tournaments: Tournament[] = [];

  /*nowtournaments = [
    {
      name: 'Mikulás kupa',
      organizer: 'Teszt Elek',
      location: 'Győr',
      start_date: '2021.12.24',
      entry_fee: "10.000"
    },
    {
      name: 'Mikulás kupa',
      organizer: 'Teszt Elek',
      location: 'Budapest',
      start_date: '2021.12.24',
      entry_fee: "10.000"
    }
  ]

  tournaments = [
    {
      name: 'Mikulás kupa',
      organizer: 'Teszt Elekasd',
      location: 'Győr',
      start_date: '2021.12.24',
      entry_fee: "10.000"
    },
    {
      name: 'Mikulás kupa',
      organizer: 'Teszt Elek',
      location: 'Budapest',
      start_date: '2021.12.24',
      entry_fee: "10.000"
    },
    {
      name: 'Mikulás kupa',
      organizer: 'Teszt Elek',
      location: 'Győr',
      start_date: '2021.12.24',
      entry_fee: "10.000"
    },
    {
      name: 'Mikulás kupa',
      organizer: 'Teszt Elek',
      location: 'Győr',
      start_date: '2021.12.24',
      entry_fee: "10.000"
    },
    {
      name: 'Mikulás kupa',
      organizer: 'Teszt Elek',
      location: 'Győr',
      start_date: '2021.12.24',
      entry_fee: "10.000"
    },
    {
      name: 'Mikulás kupa',
      organizer: 'Teszt Elek',
      location: 'Győr',
      start_date: '2021.12.24',
      entry_fee: "10.000"
    }
  ]*/

  constructor(private tournamentService: TournamentService) { }

  ngOnInit(): void {
    this.getTournaments();
  }
  
  getTournaments(): void {
    this.tournamentService.getAllByUserId(1).subscribe(
      (data: Tournament[]) => this.tournaments = data,
      err => console.log(err)
    );
  }

}
