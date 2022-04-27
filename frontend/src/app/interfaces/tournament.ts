export interface Tournament {
  id: number;
  organizerId: number;
  organizerName: string,
  startDate: Date;
  endDate: Date;
  name: string;
  location: string;
  county: string;
  bestPlayer: string | null;
  topScorer: string | null;
  bestGoalkeeper: string | null;
  entryFee: number;
  teamsCount: number;
  description: string;
  type: string;
  groupMatches: number;
  knockoutMatches: number;
  finalMatches: number;
}
