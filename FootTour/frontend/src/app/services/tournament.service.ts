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
    return this.http.get<Tournament[]>(`${environment.backendURL}/controllers/tournamentController.php`);
  }

  getById(id: number): Observable<TournamentModel> {
    return this.http.get<TournamentModel>(`${environment.backendURL}/tournaments/list.php?id=${id}`);
  }

  getAllByUserId(id: number): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${environment.backendURL}/controllers/tournamentController.php?userId=${id}`);
  }

}
