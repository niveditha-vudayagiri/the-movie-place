export enum RoleEnum{
    User = 'USER',
    Admin = 'ADMIN'
}

export class Role {
    id: number;
    role: RoleEnum;
}