import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxiService {

  private apiServerUrl=environment.baseUrl;
  constructor(private http : HttpClient) { }
  getAllNumTaxi() : Observable<number[]>{
    return this.http.get<number[]>(`${this.apiServerUrl}/taxi/retrieve-num-taxi`);
  }
}
