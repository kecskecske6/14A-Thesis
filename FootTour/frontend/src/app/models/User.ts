import { User } from "../interfaces/user";

export class UserModel implements User {
    id = 0;
    name = '';
    email = '';
    password = '';
    isDeleted = false
    isOrganizer = false;
    isReferee = false;
    isLeader = false;

    constructor(model: any = undefined) {
        if (model) {
            this.id = Number(model.id);
            this.name = model.name;
            this.email = model.email;
            this.password = model.password;
            this.isDeleted = model.is_deleted == "true" ? true : false;
            this.isOrganizer = model.is_organizer == "true" ? true : false;
            this.isReferee = model.is_referee == "true" ? true : false;
            this.isLeader = model.is_leader == "true" ? true : false;
        }
    }
}