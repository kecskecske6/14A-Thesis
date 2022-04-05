export interface Match {
    id: number;
    team1Id: number;
    team2Id: number;
    refereeId: number;
    team1Goals: number | null;
    team2Goals: number | null;
    code: string;
    groupId: number;
}