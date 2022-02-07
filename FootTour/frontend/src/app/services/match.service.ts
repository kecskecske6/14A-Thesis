import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Event } from '../interfaces/event';
import { MatchModel } from '../models/Match';
import { PlayerModel } from '../models/Player';

@Injectable({
  providedIn: 'root'
})

export class MatchService {

  constructor(private http: HttpClient) { }

  getMatchById(id: number): Observable<any>{
    return this.http.get<any>(`${environment.backendURL}/api/matches/getById.php?matchId=${id}`);
  }

sendMatchReport(match: MatchModel): Observable<any>{
  return this.http.put<any>(`${environment.backendURL}/api/matches/save.php`, match);
}

sendEvents(events: Event[]){
  return this.http.post<any>(`${environment.backendURL}/api/events/save.php`, events);
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
          if(player.id == event.playerId){
            switch (event.type) {
              case "goal":
                  player.goals++;
                  player.number_of_goals_in_a_match.push(event.minute);
                break;
              case "yellowCard":
                  player.yellowCards = event.minute;
                  player.number_of_yellows_in_a_match.push(event.minute);
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

  create(model: MatchModel): Observable<MatchModel> {
    return this.http.post<MatchModel>(`${environment.backendURL}/api/matches/create.php`, model);
  }
  setPlayerProperties(players: PlayerModel[]){
    players.forEach(player => {
      player.number_of_goals_in_a_match = [];
      player.number_of_yellows_in_a_match = [];
      player.redCard = 0;
    });
    return players;
  }
}
