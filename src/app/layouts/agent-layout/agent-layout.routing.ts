import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ClientComponent } from 'src/app/pages/client/client.component';
import { AgentCourseComponent } from 'src/app/pages/agent-course/agent-course.component';
import { SocieteComponent } from 'src/app/pages/societe/societe.component';
import { UpdateCourseComponent } from 'src/app/pages/update-course/update-course.component';
import { AddCoursesComponent } from 'src/app/pages/add-courses/add-courses.component';
import { CourseComponent } from 'src/app/pages/course/course.component';

export const AgentLayoutRoutes: Routes = [
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'clients',          component: ClientComponent },
    { path: 'agent-courses',          component: AgentCourseComponent },
    { path: 'societes',          component: SocieteComponent },
    { path: 'courses',          component: CourseComponent },
    { path: 'courses/:numCourse',          component: UpdateCourseComponent },
    { path: 'agent-courses/addcourse',           component: AddCoursesComponent },
    { path: 'agent-courses/:numCourse',          component: UpdateCourseComponent },

];