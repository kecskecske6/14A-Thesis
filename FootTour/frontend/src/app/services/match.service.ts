import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { event } from '../models/Event';
import { Match } from '../models/Match';
import { Player } from '../models/Player';

@Injectable({
  providedIn: 'root'
})

export class MatchService {

  constructor(private http: HttpClient) { }

  getMatchById(id: number): Observable<any>{
    return this.http.get<any>(`${environment.backendURL}/api/matches/getById.php?matchId=${id}`);
  }

  sendMatchReport(match: Match): Observable<any>{
    return this.http.put<any>(`${environment.backendURL}/api/matches/save.php`, match);
  }

  sendEvents(events: event[]){
    return this.http.post<any>(`${environment.backendURL}/api/events/save.php`, events);
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
      player.number_of_yellows_in_a_match = [];
      player.redCard = 0;
    });
    return players;
  }
}
