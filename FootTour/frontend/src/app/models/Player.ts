export class Player{
    id = -1;
    name= " ";
    birth_date= 2002;
    goals= -1;
    yellow_cards=-1;
    red_cards = -1;
    kit_number = -1;
    number_of_goals_in_a_match :number[] = [];

    constructor(player: any = undefined){
        this.id = player.id;
        this.name = player.name;
        this.birth_date = player.birth_date;
        this.goals = player.goals;
        this.yellow_cards = player.yellow_cards;
        this.red_cards = player.red_cards;
        this.kit_number = player.kit_number;
    }
}