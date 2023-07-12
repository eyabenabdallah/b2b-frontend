import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: any;
  token: string;
  connectedUser: User;

  constructor(private usersService: UsersService,private router: Router,private toastr: ToastrService) { }
  getDecodedAccessToken(token: string): any {
    //try {
      return jwt_decode(token);
    /*} catch(Error) {
      return null;
    }*/
  }

  ngOnInit() {
    this.connectedUser = {
      idLog: null,
      username: null,
      password: null,
      role: null,
      active: null,
      nom: null,
      prenom: null,
      tel: null,
      taxi:{
        idTaxi: null,
        numTaxi: null,
        adresse: null
      }
  }
  this.token=sessionStorage.getItem('auth-user');
  this.currentUser = this.getDecodedAccessToken(this.token);
  this.retrieveConnectedUser(this.currentUser.sub);
}

 retrieveConnectedUser(username: string){
    this.usersService.getConnectedUser(username).subscribe(res =>{ this.connectedUser= res})
 }




editUserProfile(connectedUser: User){
  this.usersService.updateUser(this.connectedUser).subscribe();
  if(this.connectedUser.username!=this.currentUser.sub){
    window.sessionStorage.clear();
    this.router.navigate(['login']);
  }
  else{
    this.toastr.success('user registred successfully.');
      window.location.reload();
      (error: HttpErrorResponse)=>{
        this.toastr.error("Something went wrong.");
      };
  }
}

}
