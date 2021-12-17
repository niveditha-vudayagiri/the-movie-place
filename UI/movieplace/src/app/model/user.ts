import { Role } from "./role";
export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    roles: Role[];
    token?: string;
}