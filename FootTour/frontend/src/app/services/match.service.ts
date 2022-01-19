import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Match } from '../models/Match';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  getMatchById(id: number): Observable<any>{
    return this.http.get<any>(`${environment.backendURL}/api/matches/getById.php?matchId=${id}`);
  }
}
