import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TeamModel } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getAllByTournamentId(id: number): Observable<TeamModel[]> {
    return this.http.get<TeamModel[]>(`${environment.backendURL}/api/teams/list.php?tournamentId=${id}`);
  }
}
