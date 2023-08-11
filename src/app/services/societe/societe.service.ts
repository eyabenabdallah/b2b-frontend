import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Societe } from 'src/app/models/societe';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  private apiServerUrl=environment.baseUrl;
  constructor(private http : HttpClient) { }

  getSocietes() : Observable<Societe[]>{
    return this.http.get<Societe[]>(`${this.apiServerUrl}/societe/retrieve-all-societes`);
  }

  addSociete(societe:Societe){
    return this.http.post<Societe>(`${this.apiServerUrl}/societe/add-societe`,societe);
  }

  searchSocietesByName(nom: string) : Observable<Societe[]>{
    return this.http.get<Societe[]>(`${this.apiServerUrl}/societe/retrieve-societes/?name=${name}`);
  }

  deleteSocieteById(id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/societe/remove-societe/${id}`);
  }

  editSociete(societe: Societe){
    return this.http.put<Societe>(`${this.apiServerUrl}/societe/modify-societe`,societe);
  }

}
