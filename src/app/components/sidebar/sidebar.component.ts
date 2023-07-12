import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'register', title: 'INSCRIPTION',  icon:'ni ni-lock-circle-open text-red', class: '' },
    { path: 'user-profile', title: 'MON PROFIL',  icon:'ni ni-badge text-blue', class: '' },
    { path: 'agents', title: 'LES AGENTS',  icon:'ni ni-circle-08 text-orange', class: '' },
    { path: 'taxis', title: 'LES TAXIS',  icon:'ni ni-bus-front-12 text-yellow', class: '' },
    { path: 'societes', title: 'LES CLIENTS',  icon:'ni ni-building text-black', class: '' },
    { path: 'clients', title: 'LES PERSONNELS',  icon:'ni-single-02 text-purple', class: '' },
    { path: 'courses', title: 'LES COURSES',  icon:'ni ni-delivery-fast text-green', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

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
