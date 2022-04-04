import { User } from "../interfaces/user";

export interface LoginResponse {
    access_token: string;
    data: User;
    name: string;
    id: number;
    status: string;
    message: string;
    userType: string;
}
