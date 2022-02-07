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
            this.isDeleted = model.isDeleted == "true" ? true : false;
            this.isOrganizer = model.isOrganizer == "true" ? true : false;
            this.isReferee = model.isReferee == "true" ? true : false;
            this.isLeader = model.isLeader == "true" ? true : false;
        }
    }
}