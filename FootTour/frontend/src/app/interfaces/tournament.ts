export interface Tournament {
    id: number;
    organizerId: number;
    startDate: Date;
    endDate: Date;
    name: string;
    location: string;
    bestPlayer?: string;
    topScorer?: string;
    bestGoalkeeper?: string;
    entryFee: number;
    teamsCount: number;
    description: string;
}