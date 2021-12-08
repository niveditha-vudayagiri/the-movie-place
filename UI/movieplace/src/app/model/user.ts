import { Role } from "./role";
export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role: Role;
    token?: string;
}