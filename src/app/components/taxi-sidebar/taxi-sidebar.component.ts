import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'user-profile', title: 'MON PROFIL',  icon:'ni ni-badge text-blue', class: '' },
  { path: 'mycourses', title: 'MES COURSES',  icon:'ni ni-delivery-fast text-green', class: '' },

];

@Component({
  selector: 'app-taxi-sidebar',
  templateUrl: './taxi-sidebar.component.html',
  styleUrls: ['./taxi-sidebar.component.css']
})
export class TaxiSidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

}
