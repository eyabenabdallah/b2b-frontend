import { Course } from "./course";
import { Societe } from "./societe";

export class Client {
    idClient: number;
    nom : string;
    prenom: string;
    tel: number;
    activite: string;
    societe: Societe;
    courses:Course[];
}