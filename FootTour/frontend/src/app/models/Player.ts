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
    number_of_yellows_in_a_match: number[] = [];
    redCard = 0;

    constructor(player: any = undefined){
        if (player){
            this.id = player.id;
            this.name = player.name;
            this.goals = player.goals;
        }
    }
    constructor(player: any = undefined) {
        this.id = player.id;
        this.name = player.name;
        this.goals = player.goals;
    }
}