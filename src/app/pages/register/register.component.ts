import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  User : User = new User();
  constructor(private userService: UsersService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.getRoles();
    this.User = {
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

  addUser(){

    this.userService.register(this.User).subscribe((response:User)=>{
      this.toastr.success('Utilisateur enregistré avec succès.');
      window.location.reload();
    },
    (error: HttpErrorResponse)=>{
      this.toastr.error("Something went wrong.");
    });
    
  }



}
