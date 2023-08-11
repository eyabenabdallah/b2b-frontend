import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiServerUrl=environment.baseUrl;
  constructor(private http: HttpClient) {}
  authenticate(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/authenticate` , {
      username,
      password
    }, httpOptions);
  }

  getDecodedAccessToken(token: string): any {
    return jwt_decode(token);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("auth-user");
    return !(user === null);
  }

  loggedUserAuthoritiy() {
    if (this.isUserLoggedIn()) {
      let token = sessionStorage.getItem("auth-user");
      return this.getDecodedAccessToken(token).roles[0].authority;
    }
  }

  logOut() {
    sessionStorage.removeItem("username");
  }

  register(user:User){
    return this.http.post<User>(`${this.apiServerUrl}/log/add-log`,user);
  }

  public getTaxi(): Observable<User[]>{
    return this.http.get<any>(`${this.apiServerUrl}/log/retrieve-all-taxis`);
  }

  public getAgent(): Observable<User[]>{
    return this.http.get<any>(`${this.apiServerUrl}/log/retrieve-all-agents`);
  }

  public fireAgent(agentId: number): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/log/fire-agent/${agentId}`,null);
  }

  public updateUser(user: User): Observable<User[]>{
    const newUserDetails = {
      idLog:user.idLog,
      password: user.password,
      username: user.username,
      active: user.active,
      role:user.role,
      nom:user.nom,
      prenom:user.prenom,
      tel:user.tel,
      taxi:user.taxi
    };

    return this.http.put<any>(`${this.apiServerUrl}/log/modify-user`,newUserDetails);
  }

  getConnectedUser(username: string) : Observable<User>{
    return this.getUserByUserName(username);
  }

  getUserByUserName(username: string) : Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/log/retrieve-user/${username}`);
  }
  

  getUsernamesContaining(substring: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiServerUrl}/user/${substring}`);
  }

  getUserByCourse(numCourse: number) : Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/log/get-user/${numCourse}`);
  }
}
