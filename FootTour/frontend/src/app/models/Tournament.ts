import { Tournament } from "../interfaces/tournament";

export class TournamentModel implements Tournament {
    id = 0;
    organizerId = 0;
    startDate: Date = new Date();
    endDate: Date = new Date();
    name = '';
    location = '';
    bestPlayer: string | null = null;
    topScorer: string | null = null;
    bestGoalkeeper: string | null = null;
    entryFee = 0;
    teamsCount = 0;
    description = '';

    constructor(model: any = undefined) {
        if (model) {
            this.id = Number(model.id);
            this.organizerId = Number(model.organizer_id);
            this.startDate = new Date(model.start_date);
            this.endDate = new Date(model.end_date);
            this.name = model.name;
            this.location = model.location;
            this.bestPlayer = model.best_player;
            this.topScorer = model.top_scorer;
            this.bestGoalkeeper = model.best_goalkeeper;
            this.entryFee = Number(model.entry_fee);
            this.teamsCount = Number(model.teams_count);
            this.description = model.description;
        }
    }
}