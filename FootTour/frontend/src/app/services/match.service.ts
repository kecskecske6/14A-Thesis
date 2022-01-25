import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Event } from '../interfaces/event';
import { PlayerModel } from '../models/Player';

@Injectable({
  providedIn: 'root'
})

export class MatchService {

  constructor(private http: HttpClient) { }

  getMatchById(id: number): Observable<any>{
    return this.http.get<any>(`${environment.backendURL}/api/matches/getById.php?matchId=${id}`);
  }

  setEventsToPlayers(events: Event[], players: PlayerModel[]){
      players.forEach(player => {
        player.goals=0;
        player.yellowCards = 0;
        player.redCards = 0;
      });
      players.forEach(player => {
        player.number_of_goals_in_a_match = [];
        events.forEach(event => {
          if(player.id == event.player_id){
            switch (event.type) {
              case "goal":
                  player.goals++;
                  player.number_of_goals_in_a_match.push(event.minute);
                break;
              case "yellowCard":
                  player.yellowCards = event.minute;
                break;
              case "redCard":
                  player.redCards = event.minute;
                break;
              default:
                break;
              }
            }
        });
        console.log(player.number_of_goals_in_a_match);
      });
      return players;
  }
}
