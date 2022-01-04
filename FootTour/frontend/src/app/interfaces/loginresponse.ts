import { User } from "./user";

export interface LoginResponse {
    access_token: string;
    data : User;
    name: string;
    status : string;
    message : string;
}