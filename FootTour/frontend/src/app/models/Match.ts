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
            this.id = match.id;
            this.team1Id = match.team1_id;
            this.team2Id = match.team2_id;
            this.refereeId = match.referee_id;
            this.team1Goals = match.team1_goals;
            this.team2Goals = match.team2_goals;
            this.code = match.code;
            this.groupId = Number(match.group_id);
            this.time = new Date(match.time);
        }
    }
}