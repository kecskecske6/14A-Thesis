import { Match } from "../interfaces/match";

export class MatchModel implements Match {
    id = 0;
    tournamentId = 0;
    team1Id = 0;
    team2Id = 0;
    refereeId = 0;
    team1Goals = 0;
    team2Goals = 0;
    code = "";
    players = {};
    team1Name = "";
    team2Name = "";
    refereeName = "";

    constructor(match: any = undefined) {
        if (match) {
            this.id = match.id;
            this.tournamentId = match.tournamentId;
            this.team1Id = match.team1Id;
            this.team2Id = match.team2Id;
            this.refereeId = match.refereeId;
            this.team1Goals = match.team1Goals;
            this.team2Goals = match.team2Goals;
            this.code = match.code;
            this.players = match.players;
            this.team1Name = match.team1Name;
            this.team2Name = match.team2Name;
            this.refereeName = match.refereeName;
        }
    }
}