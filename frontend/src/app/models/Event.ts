import { Event } from "../interfaces/event";

export class EventModel implements Event {
    id = 0;
    matchId = 0;
    playerId = 0;
    type = "";
    minute = -1;

    constructor(event: any = undefined) {
        if (event) {
            this.id = event.id;
            this.matchId = event.matchId;
            this.playerId = event.playerId;
            this.type = event.type;
            this.minute = event.minute;
        }
    }
}