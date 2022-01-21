export class event{
    id = 0;
    match_id = 0;
    player_id = 0;
    type = "";
    minute = -1;

    constructor(event: any = undefined){
        if(event){
            this.id = event.id;
            this.match_id = event.match_id;
            this.player_id = event.player_id;
            this.type = event.type;
            this.minute = event.minute;
        }
    }
}