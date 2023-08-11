import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { Course } from 'src/app/models/course';
import { Societe } from 'src/app/models/societe';
import { ClientService } from 'src/app/services/client/client.service';
import { CourseService } from 'src/app/services/course/course.service';
import { SocieteService } from 'src/app/services/societe/societe.service';
import { TaxiService } from 'src/app/services/taxi/taxi.service';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import jwt_decode from 'jwt-decode';

import { Observable, debounceTime, startWith, switchMap } from 'rxjs';


@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  listCourses: Course[];
  Course : Course = new Course();
  //client:string="";
  listClients: Client[];
  Client: any[] = [];
  numTaxi:number[];
  logId:number;
  selectedClients: Client[] = [];
  searchControl = new FormControl();
  societeList: string[];
  selectedSocietes:Societe[] = [];
  societeName: string;
  searchSociete:string;
  filteredSocietes:Societe[];
  listSocietes: Societe[];
  Societe: any[] = [];
  selectedSociete: string;
  currentUser: any;
  token: string;
  
  @ViewChild(MatAutocomplete)
  auto!: MatAutocomplete;
  constructor(private coursesService: CourseService, private clientsService: ClientService, private taxisService: TaxiService, private societeService: SocieteService, private toastr: ToastrService) { 
 
  }

  getDecodedAccessToken(token: string): any {
    //try {
      return jwt_decode(token);
    /*} catch(Error) {
      return null;
    }*/
  }

  ngOnInit(): void {
    this.getSocietes();
    this.getNumTaxi();
    this.getAllClients();
    this.Course = {
      numCourse: null,
      prix: null,
      depart: null,
      destination: null,
      date: null,
      heure: null,
      agent: null,
      clients:[]
    }
    this.token=sessionStorage.getItem('auth-user');
    this.currentUser = this.getDecodedAccessToken(this.token);
  }

  getAllClients(): void {
    this.clientsService.getClientsBySociete(this.selectedSociete).subscribe(
      (response1: Client[]) => {
        this.listClients = response1;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAllSocietes() : void {
    this.societeService.getSocietes().subscribe(
     (response1:Societe[])=>{
       this.listSocietes = response1;
     },
     (error: HttpErrorResponse)=>{
       alert(error.message);
     }
    ) 
    
  }

  search(): void {
    this.societeService.searchSocietesByName(this.societeName).subscribe(
      (societes: Societe[]) => {
        //this.filteredSocietes = societes;
      },
      (error: any) => {
        console.error('Error retrieving societes:', error);
      }
    );
  }

  retrieverSocieteByName(societeName:string): void {
    this.societeService.searchSocietesByName(societeName).subscribe(
      (societes: Societe[]) => {
        this.filteredSocietes = societes;
      },
      (error: any) => {
        console.error('Error retrieving societes:', error);
      }
    );
  }


addNewCourse() {
  this.Course.clients = [];
  for (let client of this.Client) {
    if (client.selectedClients.length > 0) {
      this.Course.clients.push(...client.selectedClients);
    }
  }

  this.coursesService.addCourse(this.Course, this.logId, this.currentUser.sub).subscribe(
    (response: Course) => {
      this.toastr.success('Course ajoutée avec succès.');
    },
    (error: HttpErrorResponse) => {
      console.error(error);
      this.toastr.error('Something went wrong.');
    }
  );
  /*() => {this.listCourses= [(this.Course.numCourse,
    this.Course),... this.listCourses];
   }
  );*/
}

addClient() {
  this.Client.push({
    selectedClients: []
  }
  );
}

removeClient(index: number) {
  this.Client.splice(index, 1);
}

addSociete() {
  this.Societe.push({
    selectedSocietes: []
  }
  );
}

removeSociete(index: number) {
  this.Societe.splice(index, 1);
}

onClientSelectionChange(index: number): void {
}

onSocieteSelectionChange(index: number): void {
}
public getNumTaxi() : void {
  this.taxisService.getAllNumTaxi().subscribe(
   (response:number[])=>{
     this.numTaxi = response;
   },
   (error: HttpErrorResponse)=>{
     alert(error.message);
   }
  ) 
}

getSocietes(): void {
  this.societeService.getSocietes().subscribe(
    (response: Societe[]) => {
      this.listSocietes = response;
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}


}
