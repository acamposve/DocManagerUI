import { Role } from "./role";

export class User {
    id!: string;
    title!: string;
    firstName!: string;
    lastName!: string;
    userName!: string;
    role!: Role;
    token?: string;
    isDeleting: boolean = false;
}