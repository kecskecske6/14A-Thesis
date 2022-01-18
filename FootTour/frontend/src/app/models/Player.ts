export class Player{
    id = -1;
    name= " ";
    birthDate= 2002;
    goals= -1;
    yellowCards=-1;
    redCards = -1;
    kitNumber = -1;

    constructor(player: any = undefined){
        this.id = player.id;
        this.name = player.name;
        this.birthDate = player.birthDate;
        this.goals = player.goals;
        this.yellowCards = player.yellowCards;
        this.redCards = player.redCards;
        this.kitNumber = player.kitNumber;
    }
}