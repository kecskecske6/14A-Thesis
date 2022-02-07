import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GroupModel } from '../models/Group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  create(model: GroupModel): Observable<GroupModel> {
    return this.http.post<GroupModel>(`${environment.backendURL}/api/groups/create.php`, model);
  }

  getByTournamentId(id: number): Observable<GroupModel[]> {
    return this.http.get<GroupModel[]>(`${environment.backendURL}/api/groups/list.php?tournamentId=${id}`);
  }
}
