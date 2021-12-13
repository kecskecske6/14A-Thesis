import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizier-earlier-tournaments',
  templateUrl: './organizer-earlier-tournaments.component.html',
  styleUrls: ['./organizer-earlier-tournaments.component.sass']
})
export class OrganizerEarlierTournamentsComponent implements OnInit {

  nowtournaments = [
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
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
