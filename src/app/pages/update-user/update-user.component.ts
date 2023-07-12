import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  currentUser: User;
  routeSub: any;
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private usersService: UsersService) { }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe((params) => {
      const username = params["username"];
      this.retrieveCurrentUser(username);
    });

    this.currentUser = {
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
  }

  retrieveCurrentUser(username: string){
    this.usersService.getConnectedUser(username).subscribe(res =>{ this.currentUser= res})
 }

 editUserProfile(){
  this.usersService.updateUser(this.currentUser).subscribe();
    this.toastr.success('Utilisateur a bien été mis à jour.');
      (error: HttpErrorResponse)=>{
        this.toastr.error("Something went wrong.");
      };
}

}
