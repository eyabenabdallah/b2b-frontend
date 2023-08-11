import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course/course.service';
import jwt_decode from "jwt-decode";
import { User } from 'src/app/models/user';
import { ClientService } from 'src/app/services/client/client.service';
import { Client } from 'src/app/models/client';
import { UsersService } from 'src/app/services/users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TaxiService } from 'src/app/services/taxi/taxi.service';


@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {

  currentUser: any;
  course: Course;
  clients: Client[] = [];;
  user: User;
  num: number[] =[];
  routeSub: any;
  token: string;
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private courseService: CourseService,
    private clientService: ClientService,
    private userService: UsersService,
    private taxiService: TaxiService
  ) { }

  getDecodedAccessToken(token: string): any {
    //try {
    return jwt_decode(token);
    /*} catch(Error) {
      return null;
    }*/
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      const numCourse = params["numCourse"];
      this.retrieveCourse(numCourse);
      this.retrieveClients(numCourse);
      this.retrieveTaxi(numCourse);
    });
    this.retrieveNumTaxi();
    this.course = {
      numCourse: null,
      prix: null,
      depart: null,
      destination: null,
      date: null,
      heure: null,
      agent: null,
      clients: []
    }
    this.token = sessionStorage.getItem('auth-user');
    this.currentUser = this.getDecodedAccessToken(this.token);
  }

  retrieveCourse(numCourse: number) {
    this.courseService.getCoursesByNumCourse(numCourse).subscribe(res => {  this.course = res })
  }

  retrieveClients(numCourse: number) {
    this.clientService.getClientsByCourse(numCourse).subscribe(res => {  this.clients = res })
  }

  retrieveTaxi(numCourse: number) {
    this.userService.getUserByCourse(numCourse).subscribe(res => {
      if (res) {
        this.user = res;
      }
    });
  }

  retrieveNumTaxi() {
    this.taxiService.getAllNumTaxi().subscribe((res: number[]) => {
      this.num = res;
    });
  }

  editCourse() {
    // Check if numTaxi exists in this.num array
    const numExists = this.num.includes(this.user.taxi.numTaxi);
    if (numExists) {
      this.courseService.updateCourse(this.course, this.user.taxi.numTaxi, this.currentUser.sub).subscribe(
        (response: Course) => {
          this.toastr.success('Course updated successfully.');
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          this.toastr.error('Something went wrong.');
        }
      );
    } else {
      this.toastr.error('Num taxi does not exist.');
    }
  }

}
