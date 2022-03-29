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
      county: '',
      postalCode: 9021,
      city: '',
      street: ''
    },
    description: '',
    startDate: '',
    startTime: '',
    finalDate: '',
    finalTime: '',
    entryFee: 0,
    teamsCount: 8,
    type: 'Egyenes kieséses',
    fields: 1
  }

  constructor(private tournamentService: TournamentService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): any {
    if (this.tournamentModel.name == '' || this.tournamentModel.location.city == '' || this.tournamentModel.location.street == '' || this.tournamentModel.description == '' || this.tournamentModel.startDate == '' || this.tournamentModel.startTime == '' || this.tournamentModel.finalDate == '' || this.tournamentModel.finalTime == '' || this.tournamentModel.location.county == '') return alert('Minden mezőt ki kell tölteni!');
    if (this.tournamentModel.teamsCount == 8 && this.tournamentModel.type == 'Csoportkör és kieséses') return alert('Nem lehet 8 csapattal csoportkört csinálni!');
    if (new Date(new Date(this.tournamentModel.startDate).getTime() + Number(this.tournamentModel.startTime.split(':')[0]) * 3600000 + Number(this.tournamentModel.startTime.split(':')[1]) * 60000).getTime() < new Date().getTime() - new Date().getTimezoneOffset() * 60000 || new Date(new Date(this.tournamentModel.finalDate).getTime() + Number(this.tournamentModel.finalTime.split(':')[0]) * 3600000 + Number(this.tournamentModel.finalTime.split(':')[1]) * 60000).getTime() < new Date(new Date(this.tournamentModel.startDate).getTime() + Number(this.tournamentModel.startTime.split(':')[0]) * 3600000 + Number(this.tournamentModel.startTime.split(':')[1]) * 60000 + 48 * 3600000).getTime()) return alert('Helytelen dátumok!');
    if (this.tournamentModel.fields < 1) return alert('Legalább 1 pályának lennie kell!');
    const actualModel = {
      name: this.tournamentModel.name,
      location: `${this.tournamentModel.location.postalCode} ${this.tournamentModel.location.city}, ${this.tournamentModel.location.street}`,
      county: this.tournamentModel.location.county,
      description: this.tournamentModel.description,
      startDate: new Date(new Date(this.tournamentModel.startDate).getTime() + Number(this.tournamentModel.startTime.split(':')[0]) * 3600000 + Number(this.tournamentModel.startTime.split(':')[1]) * 60000),
      endDate: new Date(new Date(this.tournamentModel.finalDate).getTime() + Number(this.tournamentModel.finalTime.split(':')[0]) * 3600000 + Number(this.tournamentModel.finalTime.split(':')[1]) * 60000),
      entryFee: this.tournamentModel.entryFee,
      teamsCount: this.tournamentModel.teamsCount,
      type: this.tournamentModel.type,
      organizerId: this.userService.getUserId(),
      fields: this.tournamentModel.fields
    };
    this.tournamentService.create(actualModel).subscribe(
      result => this.router.navigate(['/mytournaments/' + result.id]),
      error => console.log(error)
    );
  }

}
