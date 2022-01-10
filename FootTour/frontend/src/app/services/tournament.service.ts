import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tournament } from '../interfaces/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${environment.apiURL}/list.php`);
  }

  getById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`${environment.apiURL}/list.php?id=${id}`);
  }

  getAllByUserId(id: number): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`${environment.apiURL}/list.php?userId=${id}`);
  }
}
