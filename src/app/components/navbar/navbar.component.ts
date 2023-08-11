import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  currentUser: any;
  token: string;
  constructor(location: Location,  private element: ElementRef,private usersService: UsersService, private router: Router) {
    this.location = location;
  }

  getDecodedAccessToken(token: string): any {
    //try {
      return jwt_decode(token);
    /*} catch(Error) {
      return null;
    }*/
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.token=sessionStorage.getItem('auth-user');
  this.currentUser = this.getDecodedAccessToken(this.token);
  }

  logout(): void {
    window.sessionStorage.clear();
   this.router.navigate(['login']);
  }

}
