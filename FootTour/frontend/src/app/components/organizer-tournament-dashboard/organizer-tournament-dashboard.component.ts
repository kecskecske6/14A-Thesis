import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizier-tournament-dashboard',
  templateUrl: './organizer-tournament-dashboard.component.html',
  styleUrls: ['./organizer-tournament-dashboard.component.sass']
})
export class OrganizerTournamentDashboardComponent implements OnInit {

  teams =[
    {
      name: 'ittASöröm',
      payed: true
    },
    {
      name: 'ittASöröm',
      payed: false
    },
    {
      name: 'ittASöröm',
      payed: true
    },
    {
      name: 'ittASöröm',
      payed: false
    },
    {
      name: 'ittASöröm',
      payed: true
    },
    {
      name: 'ittASöröm',
      payed: true
    },
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
