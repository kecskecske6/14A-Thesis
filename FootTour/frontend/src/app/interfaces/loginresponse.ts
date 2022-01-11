import { User } from "../interfaces/user";

export interface LoginResponse {
    access_token: string;
    data : User;
    id: number;
    status : string;
    message : string;
}