import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-report',
  templateUrl: './match-report.component.html',
  styleUrls: ['./match-report.component.sass']
})
export class MatchReportComponent implements OnInit {
  match = [
    {
      team1name: 'ittASöröm',
      team2name: 'AS Róka',
      team1goals: 3,
      team2goals: 1,
      referee : "Vak János",
      tournament: "Mikulás kupa"
    }
  ]

  players = [
    {
      team: 'ittASöröm',
      name: 'Teszt Elek',
      number: 1,
      goals: [0,1,2],
      yellow_card: false,
      red_card: false
    },
    {
      team: 'ittASöröm',
      name: 'Kandisz Nóra',
      number: 5,
      goals: null,
      yellow_card: false,
      red_card: false
    },
    {
      team: 'ittASöröm',
      name: 'Pofáz Zoltán',
      number: 7,
      goals: null,
      yellow_card: true,
      red_card: false
    },
    {
      team: 'ittASöröm',
      name: 'Élő Erik',
      number: 10,
      goals: [0],
      yellow_card: false,
      red_card: false
    },
    {
      team: 'ittASöröm',
      name: 'Kiss Béla',
      number: 18,
      goals: null,
      yellow_card: false,
      red_card: true
    },
    {
      team: 'ittASöröm',
      name: 'David Villa',
      number: 95,
      goals: null,
      yellow_card: false,
      red_card: false
    },
    {
      team: 'AS Róka',
      name: 'Lakatos Tihamér',
      number: 1,
      goals: null,
      yellow_card: false,
      red_card: false
    },
    {
      team: 'AS Róka',
      name: 'Lakatos Ákos',
      number: 4,
      goals: null,
      yellow_card: false,
      red_card: false
    },
    {
      team: 'AS Róka',
      name: 'Lakatos Norbert',
      number: 9,
      goals: null,
      yellow_card: false,
      red_card: false
    },
    {
      team: 'AS Róka',
      name: 'Lakatos Ábrahám',
      number: 10,
      goals: null,
      yellow_card: false,
      red_card: false
    },
    {
      team: 'AS Róka',
      name: 'Lakatos Zsolt',
      number: 16,
      goals: [0],
      yellow_card: true,
      red_card: false
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
