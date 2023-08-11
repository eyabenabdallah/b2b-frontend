import { Time } from "@angular/common";
import { Client } from "./client";

export class Course {
    numCourse: number;
    depart : string;
    destination: string;
    date: Date;
    heure: Time;
    prix: number;
    agent: string;
    clients: Client[];
}