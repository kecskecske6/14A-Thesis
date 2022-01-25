import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
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
      players = this.setPlayerProperties(players);
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
                  player.yellow_cards = event.minute;
                break;
              case "redCard":
                  player.red_cards = event.minute;
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

  setPlayerProperties(players: Player[]){
    players.forEach(player => {
      player.number_of_goals_in_a_match = [];
      player.yellow_cards = 0;
      player.red_cards = 0;
    });
    return players;
  }
}
