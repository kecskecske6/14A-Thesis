import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TeamstoGroupsModel } from '../models/TeamstoGroups';

@Injectable({
  providedIn: 'root'
})
export class TeamstoGroupsService {

  constructor(private http: HttpClient) { }

  create(model: TeamstoGroupsModel): Observable<TeamstoGroupsModel> {
    return this.http.post<TeamstoGroupsModel>(`${environment.backendURL}/api/teams_to_groups/create.php`, model);
  }

  getByTournamentId(id: number): Observable<TeamstoGroupsModel[]> {
    return this.http.get<TeamstoGroupsModel[]>(`${environment.backendURL}/api/teams_to_groups/list.php?tournamentId=${id}`);
  }
}
