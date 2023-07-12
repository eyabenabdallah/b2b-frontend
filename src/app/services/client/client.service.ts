import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiServerUrl=environment.baseUrl;
  constructor(private http : HttpClient) { }
  getClients() : Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiServerUrl}/client/retrieve-all-clients`);
  }


  editClient(client: Client){
    return this.http.put<Client>(`${this.apiServerUrl}/client/retrieve-all-clients`,client);
  }

  addClient(client:Client){
    return this.http.post<Client>(`${this.apiServerUrl}/client/add-client`,client);
  }

  getClient(email: string) : Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiServerUrl}/client/retrieve-all-clients`+email);
  }

  getClientByNames() : Observable<string[]>{
    return this.http.get<string[]>(`${this.apiServerUrl}/client/names`);
  }

  getClientsBySociete(nomSociete: string): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiServerUrl}/client/retrieve-clients/${nomSociete}`);
  }

  deleteClientById(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/client/remove-client/${id}`);
  }

  getClientsByCourse(numCourse: number): Observable<Client[]>{
    return this.http.get<Client[]>(`${this.apiServerUrl}/client/get-clients/${numCourse}`);
  }

  

}
