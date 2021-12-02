import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-tournaments',
  templateUrl: './available-tournaments.component.html',
  styleUrls: ['./available-tournaments.component.sass']
})
export class AvailableTournamentsComponent implements OnInit {

  tournaments = [
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
    },
    {
      name: 'Mikulás kupa',
      organizer: 'Teszt Elek',
      location: 'Szeged',
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
