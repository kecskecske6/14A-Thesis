import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayersByTeamId(id: any): Observable<any> {
    return this.http.get<Player[]>(`${environment.backendURL}/controllers/playerController.php?teamId=${id}`);
  }
}
