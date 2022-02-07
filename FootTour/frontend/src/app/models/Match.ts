import { Match } from "../interfaces/match";

export class MatchModel implements Match {
    id = 0;
    team1Id = 0;
    team2Id = 0;
    refereeId = 0;
    team1Goals = 0;
    team2Goals = 0;
    code = "";
    groupId = 0;
    time = new Date();

    constructor(match: any = undefined) {
        if (match) {
            this.id = Number(match.id);
            this.team1Id = Number(match.team1Id);
            this.team2Id = Number(match.team2Id);
            this.refereeId = Number(match.refereeId);
            this.team1Goals = Number(match.team1Goals);
            this.team2Goals = Number(match.team2Goals);
            this.code = match.code;
            this.groupId = Number(match.groupId);
            this.time = new Date(match.time);
        }
    }
}