import { Role } from "./role";
import { Taxi } from "./taxi";

export class User {
    idLog: number;
    role: Role;
    password : string;
    username: string;
    active: boolean;
    nom : string;
    prenom: string;
    tel: number;
    taxi: Taxi
}