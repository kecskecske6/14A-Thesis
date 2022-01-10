export class Tournament {
    public id = 0;
    public organizerId = 0;
    public startDate: Date = new Date();
    public endDate: Date = new Date();
    public name = '';
    public location = '';
    public bestPlayer: string | null = null;
    public topScorer: string | null = null;
    public bestGoalkeeper: string | null = null;
    public entryFee = 0;
    public teamsCount = 0;
    public description = '';
}