import { Team } from "../interfaces/team";

export class TeamModel implements Team {
    id = 0;
    leaderId = 0;
    name = '';
    constructor(model: any = undefined) {
        if (model) {
            this.id = Number(model.id);
            this.leaderId = Number(model.leader_id);
            this.name = model.name;
        }
    }
}