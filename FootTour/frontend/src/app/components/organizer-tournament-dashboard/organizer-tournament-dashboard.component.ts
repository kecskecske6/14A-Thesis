import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/interfaces/team';
import { TournamentModel } from 'src/app/models/Tournament';
import { TeamService } from 'src/app/services/team.service';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-organizer-tournament-dashboard',
  templateUrl: './organizer-tournament-dashboard.component.html',
  styleUrls: ['./organizer-tournament-dashboard.component.sass']
})
export class OrganizerTournamentDashboardComponent implements OnInit {

  teams: Team[] = [];
  tournament: TournamentModel = new TournamentModel();
  /*teams =[
    {
      name: 'ittASöröm',
      paid: true
    },
    {
      name: 'ittASöröm2',
      paid: false
    },
    {
      name: 'ittASöröm3',
      paid: true
    },
    {
      name: 'ittASöröm4',
      paid: false
    },
    {
      name: 'ittASöröm5',
      paid: true
    },
    {
      name: 'ittASöröm6',
      paid: true
    },
    {
      name: 'ittASöröm7',
      paid: true
    },
    {
      name: 'ittASöröm8',
      paid: true
    }
  ]*/


  constructor(private teamService: TeamService, private tournamentService: TournamentService) { }
  /*ngOnInit(): void {
    this.getTournaments();
  }
  
  getTournaments(): void {
    this.tournamentService.getAllByUserId(1).subscribe(
      (data: Tournament[]) => this.tournaments = data,
      err => console.log(err)
    );
  }*/
  ngOnInit(): void {
    this.getTeams();
    this.getTournamentInfo();
  }

  getTeams(): void {
    this.teamService.getAllByTournamentId(2).subscribe(
      (data: Team[]) => this.teams = data,
      err => console.log(err)
    );
  }

  getTournamentInfo(): void {
    this.tournamentService.getById(2).subscribe(
      (data: TournamentModel) => this.tournament = new TournamentModel(data),
      err => console.log(err)
    );
    console.log(this.tournament);
  }

}
