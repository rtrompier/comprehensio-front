import { Role } from '../role/role.model';

export class User {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public isAvailable: boolean;
    public langs: any[];
    public roles: Role[];
}
