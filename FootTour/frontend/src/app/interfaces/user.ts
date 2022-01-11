export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isDeleted: boolean;
    isOrganizer: boolean;
    isReferee: boolean;
    isLeader: boolean;
}