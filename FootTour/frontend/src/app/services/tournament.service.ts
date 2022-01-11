import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tournament } from '../models/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${environment.backendURL}/controllers/tournamentController.php`);
  }

  getById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${environment.backendURL}/controllers/tournamentController.php?id=${id}`);
  }

  getAllByUserId(id: number): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${environment.backendURL}/controllers/tournamentController.php?userId=${id}`);
  }

}
