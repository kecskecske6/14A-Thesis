import { userPermissions } from "../interfaces/userPermissions";

export class UserPermissions implements userPermissions {

  isLeader = -1;
  isOrganizer = -1;
  isReferee = -1;

  constructor(model: Array<number>) {
      if (model) {
        this.isOrganizer = model[0];
        this.isReferee = model[1];
        this.isLeader = model[2];
      }
  }
}
