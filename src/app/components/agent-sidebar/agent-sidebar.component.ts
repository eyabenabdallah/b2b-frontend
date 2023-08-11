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
  { path: 'societes', title: 'LES CLIENTS',  icon:'ni ni-building text-black', class: '' },
  { path: 'clients', title: 'LES PERSONNELS',  icon:'ni-single-02 text-yellow', class: '' },
  { path: 'courses', title: 'LES COURSES',  icon:'ni ni-delivery-fast text-green', class: '' },
  { path: 'agent-courses', title: 'MES COURSES',  icon:'ni ni-delivery-fast text-red', class: '' },
];

@Component({
  selector: 'app-agent-sidebar',
  templateUrl: './agent-sidebar.component.html',
  styleUrls: ['./agent-sidebar.component.css']
})
export class AgentSidebarComponent implements OnInit {

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
