import { TeamstoGroups } from "../interfaces/teamstoGroups";

export class TeamstoGroupsModel implements TeamstoGroups {
    id = 0;
    teamId = 0;
    groupId = 0;

    constructor(model: any = undefined) {
        if (model) {
            this.id = Number(model.id);
            this.teamId = Number(model.team_id);
            this.groupId = Number(model.group_id);
        }
    }
}