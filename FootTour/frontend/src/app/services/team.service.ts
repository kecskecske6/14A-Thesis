import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Team } from '../interfaces/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getAllByTournamentId(id: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.backendURL}/api/teams/list.php?tournamentId=${id}`);
  }

  registerTeam(team: any){
    return this.http.post<any>(`${environment.backendURL}/api/teams/registerToTournament.php`, team);
  }
}
