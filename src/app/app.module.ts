import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { TaxiLayoutComponent } from './layouts/taxi-layout/taxi-layout.component';
import { AgentLayoutComponent } from './layouts/agent-layout/agent-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { ClientComponent } from './pages/client/client.component';
import { CourseComponent } from './pages/course/course.component';
import { TaxiCourseComponent } from './pages/taxi-course/taxi-course.component';
import { AgentCourseComponent } from './pages/agent-course/agent-course.component';
import { AddCoursesComponent } from './pages/add-courses/add-courses.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { TaxisComponent } from './pages/taxis/taxis.component';
import { BasicAuthInterceptorService, authInterceptorProviders } from './services/users/basic-auth-interceptor.service';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { SocieteComponent } from './pages/societe/societe.component';
import { UpdateCourseComponent } from './pages/update-course/update-course.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    TaxiLayoutComponent,
    AgentLayoutComponent,
  ],
  providers: [
    authInterceptorProviders
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
