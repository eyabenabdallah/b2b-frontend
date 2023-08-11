import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AgentLayoutComponent } from './layouts/agent-layout/agent-layout.component';
import { TaxiLayoutComponent } from './layouts/taxi-layout/taxi-layout.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { EmployeeGuard } from './guards/employee/employee.guard';
import { TaxiGuard } from './guards/taxi/taxi.guard';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate:[AdminGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/user-layout.module').then(m => m.UserLayoutModule)
      }
    ]
  },{
    path: 'agent',
    component: AgentLayoutComponent,
    canActivate:[EmployeeGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/user-layout.module').then(m => m.UserLayoutModule)
      }
    ]
  },{
    path: 'taxi',
    component: TaxiLayoutComponent,
    canActivate:[TaxiGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/user-layout.module').then(m => m.UserLayoutModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
