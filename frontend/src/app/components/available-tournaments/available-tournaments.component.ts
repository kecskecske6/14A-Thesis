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
  organizers: string[] = [];
  page: any;
  organizer = '';
  value: number = 0;
  highValue: number = 30000;
  pickedDates: string[] = [];
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
    var date = new Date();
    console.log(date);
  }

  getTournaments(): void {
    this.tournamentService.getAvailable().subscribe(
      (data: TournamentModel[]) => {
        data.forEach(t => {
          this.tournaments.push(new TournamentModel(t));
          this.getOrganizerName(t.organizerId);
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

  getOrganizerName(id: number): void {
    this.userService.getById(id).subscribe(
      result => this.organizers.push(result.name),
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

  formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  getByFilters(county: string, value: number, highValue: number){
    if(this.model.length < 4){
      this.pickedDates = [];
      this.tournaments = [];
      this.model.forEach(m => this.pickedDates.push(this.formatDate(m)));
      this.tournamentService.getByFilters(county, value, highValue, this.pickedDates).subscribe(
        (result) =>{
          result.forEach(t => {
            console.log(t);
            this.tournaments.push(new TournamentModel(t));
        })
        },
        error =>{
          if(error.status == 401){
            this.auth.logout();
          }
        });
    }
    else{
      //Hibaüzenetet kiírni
      console.log("baj van");
      
    }
  }
}
