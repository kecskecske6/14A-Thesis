import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizier-tournament-dashboard',
  templateUrl: './organizier-tournament-dashboard.component.html',
  styleUrls: ['./organizier-tournament-dashboard.component.sass']
})
export class OrganizierTournamentDashboardComponent implements OnInit {

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
