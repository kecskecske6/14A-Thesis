import { Player } from "../interfaces/player";

export class PlayerModel implements Player {
    id = -1;
    name = " ";
    birthDate = new Date();
    goals = -1;
    yellowCards = -1;
    redCards = -1;
    kitNumber = -1;
    number_of_goals_in_a_match: number[] = [];

    constructor(player: any = undefined) {
        this.id = player.id;
        this.name = player.name;
        this.birthDate = player.birthDate;
        this.goals = player.goals;
        this.yellowCards = player.yellowCards;
        this.redCards = player.redCards;
        this.kitNumber = player.kitNumber;
    }
}