import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.sass']
})
export class DrawComponent implements OnInit {

  tournament = {
    type: 'Egyenes kieséses',
    teamsCount: 8,
    groupsAmount: 4
  }

  teams = [
    'ittASöröm',
    'ittASöröm2',
    'ittASöröm3',
    'ittASöröm4',
    'ittASöröm5',
    'ittASöröm6',
    'ittASöröm7',
    'ittASöröm8'
  ]

  types = [
    {
      name: 'Egyenes kieséses'
    },
    {
      name: 'Csoportkör és kieséses'
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  set(value: string) {
    this.tournament.type = value;
  }

  draw() {
    if (this.tournament.type == '') return alert('Kérem, válasszon típust!');
    const groups: string[][] = [];
    for (let i = 0; i < this.tournament.teamsCount / this.tournament.groupsAmount; i++) groups.push([]);
    for (let i = 0; i < this.teams.length; i++) {
      let team; 
      let doAgain;
      do {
        team = this.teams[Math.floor(Math.random() * this.teams.length)];
        doAgain = false;
        for (let j = 0; j < groups.length; j++) {
          if (groups[j].includes(team)) doAgain = true;
        }
      } while (doAgain);
      groups[Math.floor(i / this.tournament.groupsAmount)].push(team);
    }
    this.router.navigate(['/schedule']);
  }

}
