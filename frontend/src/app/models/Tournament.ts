import { Tournament } from "../interfaces/tournament";

export class TournamentModel implements Tournament {
  id = 0;
  organizerId = 0;
  startDate: Date = new Date();
  endDate: Date = new Date();
  name = '';
  location = '';
  county = '';
  bestPlayer: string | null = null;
  topScorer: string | null = null;
  bestGoalkeeper: string | null = null;
  entryFee = 0;
  teamsCount = 0;
  description = '';
  type = '';
  groupMatches = 0;
  knockoutMatches = 0;
  finalMatches = 0;
  fields = 0;

  constructor(model: any = undefined) {
    if (model) {
      this.id = Number(model.id);
      this.organizerId = Number(model.organizerId);
      this.startDate = new Date(model.startDate);
      this.endDate = new Date(model.endDate);
      this.name = model.name;
      this.location = model.location;
      this.county = model.county;
      this.bestPlayer = model.bestPlayer;
      this.topScorer = model.topScorer;
      this.bestGoalkeeper = model.bestGoalkeeper;
      this.entryFee = Number(model.entryFee);
      this.teamsCount = Number(model.teamsCount);
      this.description = model.description;
      this.type = model.type;
      this.groupMatches = Number(model.groupMatches);
      this.knockoutMatches = Number(model.knockoutMatches);
      this.finalMatches = Number(model.finalMatches);
      this.fields = Number(model.fields);
    }
  }
}
