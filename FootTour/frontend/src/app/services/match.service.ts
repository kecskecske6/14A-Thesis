import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { event } from '../interfaces/event';
import { Player } from '../models/Player';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  getMatchById(id: number): Observable<any>{
    return this.http.get<any>(`${environment.backendURL}/api/matches/getById.php?matchId=${id}`);
  }

  setEventsToPlayers(events: event[], players: Player[]){
      players.forEach(player => {
        player.goals=0;
        player.yellowCards = 0;
        player.redCards = 0;
      });
      events.forEach(event => {
        players.forEach(player => {
          if(player.id == event.playerId){
            switch (event.type) {
              case "goal":
                player.goals++;
                break;
              case "yellowCard":
                player.yellowCards++;
                break;
              default:
                break;
            }
          }
        });
      });
      return players;
  }
}
