import { Role } from "./role";
import { Profile } from "./profile";
export class User {
    id: number;
    username: string;
    password: string;
    profile: Profile;
    roles: Role[];
    token?: string;
}