import { Group } from "../interfaces/group";

export class GroupModel implements Group {
    id = 0;
    tournamentId = 0;
    name = '';

    constructor(model: any = undefined) {
        if (model) {
            this.id = Number(model.id);
            this.tournamentId = Number(model.tournament_id);
            this.name = model.name;
        }
    }
}