import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tournament } from '../interfaces/tournament';
import { TournamentModel } from '../models/Tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${environment.backendURL}/api/tournaments/list.php`);
  }

  getById(id: number): Observable<TournamentModel> {
    return this.http.get<TournamentModel>(`${environment.backendURL}/api/tournaments/list.php?id=${id}`);
  }

  getAllByUserId(id: number): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${environment.backendURL}/api/tournaments/list.php?userId=${id}`);
  }

  getBySearchParameter(parameter: any): Observable<Tournament[]>{
    return this.http.get<Tournament[]>(`${environment.backendURL}/api/tournaments/list.php?parameter=${parameter}`);
  }

  create(model: any): Observable<TournamentModel> {
    return this.http.post<TournamentModel>(`${environment.backendURL}/api/tournaments/create.php`, model);
  }

  modify(model: TournamentModel): Observable<TournamentModel> {
    return this.http.post<TournamentModel>(`${environment.backendURL}/api/tournaments/modify.php`, model);
  }

}
