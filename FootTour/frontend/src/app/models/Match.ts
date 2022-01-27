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
            this.tournamentId = match.tournament_id;
            this.team1Id = match.team1_id;
            this.team2Id = match.team2_id;
            this.refereeId = match.referee_id;
            this.team1Goals = match.team1_goals;
            this.team2Goals = match.team2_goals;
            this.code = match.code;
            this.players = match.players;
            this.team1Name = match.team1_name;
            this.team2Name = match.team2_name;
            this.refereeName = match.referee_name;
        }
    }
}