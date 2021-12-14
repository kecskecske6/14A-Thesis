import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Tournament } from '../interfaces/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('http://localhost:8000/api/list.php').pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
}
