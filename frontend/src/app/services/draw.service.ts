import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TeamModel } from '../models/Team';
import { TournamentModel } from '../models/Tournament';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor(private http: HttpClient) { }

  create(tournament: TournamentModel, teams: TeamModel[]): Observable<any> {
    return this.http.post<any>(`${environment.backendURL}/api/draw/create.php`, { tournament: tournament, teams: teams });
  }
}
