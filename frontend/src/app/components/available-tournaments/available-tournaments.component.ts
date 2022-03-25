import { Component, OnInit, Type } from '@angular/core';
import * as moment from 'moment';
import { Options } from '@angular-slider/ngx-slider';
import { TournamentModel } from 'src/app/models/Tournament';
import { AuthService } from 'src/app/services/auth.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { UserService } from 'src/app/services/user.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-available-tournaments',
  templateUrl: './available-tournaments.component.html',
  styleUrls: ['./available-tournaments.component.sass']
})
export class AvailableTournamentsComponent implements OnInit {

  tournaments: TournamentModel[] = [];
  organizer = '';
  value: number = 0;
  highValue: number = 30000;
  pickedDates: Date[] = [];
  model: Date[] = [];
  datePickerColor: ThemePalette = 'primary';
  options: Options = {
    floor: 0,
    ceil: 30000,
    step: 1000,
    getPointerColor: string =>{
      return "green"
    },
    getSelectionBarColor: string =>{
      return "green"
    },
    translate: (value: number): string => {
      return '<span style="color: white">' + value + '</span>'
    }
  };

  constructor(private tournamentService: TournamentService, private userService: UserService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getTournaments();
    this.getOrganizerName();
    var date = new Date();
    console.log(date);
  }

  getTournaments(): void {
    this.tournamentService.getAvailable().subscribe(
      (data: TournamentModel[]) => {
        data.forEach(t => {
          this.tournaments.push(new TournamentModel(t));
        });
      },
      error => {
        console.log(error);
        if (error.status == 401) {
          this.auth.logout();
        }
      }
    );
  }

  getOrganizerName(): void {
    this.userService.getById(Number(this.auth.getId())).subscribe(
      result => this.organizer = result.name,
      error => console.log(error)
    );
  }

  getBySearchParameter(searchparameter: string): void{
    this.tournaments = [];
    if(moment(searchparameter, "YYYY.MM.DD", false).isValid() ||
    moment(searchparameter, "YYYY.MM", false).isValid() ||
    moment(searchparameter, "YYYY", false).isValid()){
      searchparameter = searchparameter.replace(".", "-");
      searchparameter = searchparameter.replace("/","-");
    }
    this.tournamentService.getBySearchParameter(searchparameter).subscribe(
      (result) =>{
        result.forEach(t => {
          this.tournaments.push(new TournamentModel(t));
        })
      },
      error =>{
        if(error.status == 401){
          this.auth.logout();
        }
      });
  }

  getByFilters(county: string, value: number, highValue: number){
    this.tournaments = [];
    this.tournamentService.getByFilters(county, value, highValue).subscribe(
      (result) =>{
        result.forEach(t => {
          this.tournaments.push(new TournamentModel(t));
        })
      },
      error =>{
        if(error.status == 401){
          this.auth.logout();
        }
      });
  }
}
