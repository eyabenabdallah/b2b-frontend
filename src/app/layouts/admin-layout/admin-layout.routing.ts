import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ClientComponent } from 'src/app/pages/client/client.component';
import { CourseComponent } from 'src/app/pages/course/course.component';
import { AgentsComponent } from 'src/app/pages/agents/agents.component';
import { TaxisComponent } from 'src/app/pages/taxis/taxis.component';
import { AddCoursesComponent } from 'src/app/pages/add-courses/add-courses.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { UpdateUserComponent } from 'src/app/pages/update-user/update-user.component';
import { SocieteComponent } from 'src/app/pages/societe/societe.component';
import { UpdateCourseComponent } from 'src/app/pages/update-course/update-course.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'agents',          component: AgentsComponent },
    { path: 'taxis',          component: TaxisComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'clients',          component: ClientComponent },
    { path: 'courses',          component: CourseComponent },
    { path: 'courses/addcourse',           component: AddCoursesComponent },
    { path: 'register',          component: RegisterComponent },
    { path: 'agents/:username',           component: UpdateUserComponent },
    { path: 'taxis/:username',           component: UpdateUserComponent },
    { path: 'societes',          component: SocieteComponent },
    { path: 'courses/:numCourse',          component: UpdateCourseComponent },

];
