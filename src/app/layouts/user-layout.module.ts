import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgPipesModule } from 'ngx-pipes';
//import { Ng2OrderModule } from 'ng2-order-pipe';
import { AdminLayoutRoutes } from './admin-layout/admin-layout.routing';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { TablesComponent } from '../pages/tables/tables.component';
import { IconsComponent } from '../pages/icons/icons.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import { AgentLayoutRoutes } from './agent-layout/agent-layout.routing';
import { TaxiLayoutRoutes } from './taxi-layout/taxi-layout.routing';
import { ToastrModule } from 'ngx-toastr';
import { AddClientModal, ClientComponent } from '../pages/client/client.component';
import { CourseComponent, UpdateCourseModal } from '../pages/course/course.component';
import { TaxiCourseComponent } from '../pages/taxi-course/taxi-course.component';
import { AgentCourseComponent } from '../pages/agent-course/agent-course.component';
import { AddCoursesComponent } from '../pages/add-courses/add-courses.component';
import { AgentsComponent } from '../pages/agents/agents.component';
import { TaxisComponent } from '../pages/taxis/taxis.component';
import { RegisterComponent } from '../pages/register/register.component';
import { UpdateUserComponent } from '../pages/update-user/update-user.component';
import { AddSocieteModal, SocieteComponent, UpdateSocieteModal } from '../pages/societe/societe.component';
import { UpdateCourseComponent } from '../pages/update-course/update-course.component';

//import { RiskOpportunityComponent } from '../pages/risk-opportunity/risk-opportunity.component';
//import { RiskOpportunityManagerComponent } from '../pages/risk-opportunity-manager/risk-opportunity-manager.component';
//import { RiskOpportunityChampionComponent } from '../pages/risk-opportunity-champion/risk-opportunity-champion.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    RouterModule.forChild(AgentLayoutRoutes),
    RouterModule.forChild(TaxiLayoutRoutes),
    HttpClientModule,
    NgbModule,
    FormsModule,
    ClipboardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    NgxPaginationModule,
    NgPipesModule,
    //Ng2OrderModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTreeModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatIconModule,
    ToastrModule.forRoot()

    
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    ClientComponent,
    CourseComponent,
    TaxiCourseComponent,
    AgentCourseComponent,
    AddCoursesComponent,
    AgentsComponent,
    TaxisComponent,
    AddClientModal,
    UpdateCourseModal,
    UpdateUserComponent,
    SocieteComponent,
    AddSocieteModal,
    UpdateCourseComponent,
    UpdateSocieteModal,
    RegisterComponent

  ]
})

export class UserLayoutModule {}
