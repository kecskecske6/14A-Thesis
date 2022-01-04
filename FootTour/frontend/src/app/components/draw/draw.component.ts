import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.sass']
})
export class DrawComponent implements OnInit {

  tournament = {
    type: ''
  }

  types = [
    {
      name: 'Egyenes kieséses'
    },
    {
      name: 'Csoportkör és kieséses'
    },
    {
      name: 'Liga'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  logging() {
    console.log(this.tournament);
  }

}
