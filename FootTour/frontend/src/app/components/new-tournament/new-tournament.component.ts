import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.sass']
})
export class NewTournamentComponent implements OnInit {

  tournamentModel = {
    name: '',
    location: {
      postalCode: 9021,
      city: '',
      street: ''
    },
    description: '',
    startDate: new Date(),
    startTime: '',
    finalDate: new Date(),
    finalTime: '',
    entryFee: 0,
    teamsCount: 8,
    type: 'Egyenes kieséses'
  }

  constructor(private tournamentService: TournamentService, private userService: UserService) { }

  ngOnInit(): void {
  }

  create(): void {
    const actualModel = {
      name: this.tournamentModel.name,
      location: `${this.tournamentModel.location.postalCode} ${this.tournamentModel.location.city}, ${this.tournamentModel.location.street}`,
      description: this.tournamentModel.description,
      startDate: new Date(new Date(this.tournamentModel.startDate).getTime() + Number(this.tournamentModel.startTime.split(':')[0]) * 3600000 + Number(this.tournamentModel.startTime.split(':')[1]) * 60000),
      endDate: new Date(new Date(this.tournamentModel.finalDate).getTime() + Number(this.tournamentModel.finalTime.split(':')[0]) * 3600000 + Number(this.tournamentModel.finalTime.split(':')[1]) * 60000),
      entryFee: this.tournamentModel.entryFee,
      teamsCount: this.tournamentModel.teamsCount,
      type: this.tournamentModel.type,
      organizerId: this.userService.getUserId()
    }
    let id = 0;
    this.tournamentService.create(actualModel).subscribe(
      result => id = result.id,
      error => console.log(error)
    );
  }

}
