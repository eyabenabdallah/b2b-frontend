import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course/course.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { filter } from 'rxjs';


@Component({
  selector: 'app-agent-course',
  templateUrl: './agent-course.component.html',
  styleUrls: ['./agent-course.component.css']
})
export class AgentCourseComponent implements OnInit {

  listCourses: Course[];
  closeResult! : string;
  form : boolean = false;
  Course : Course = new Course();
  depart:any;
  p:number=1;
  connectedCourse: Course = new Course();
  dataSource: MatTableDataSource<Course>;
  startDate:any;
  endDate:any;
  currentUser: any;
  token: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  constructor(private Courseservice: CourseService,private modalService: NgbModal, private router: Router, private toastr: ToastrService) { this.dataSource = new MatTableDataSource(this.listCourses);}

  getDecodedAccessToken(token: string): any {
    //try {
      return jwt_decode(token);
    /*} catch(Error) {
      return null;
    }*/
  }

  ngOnInit(): void {
    this.Course = {
      numCourse: null,
      prix: null,
      depart: null,
      destination: null,
      date: null,
      heure: null,
      agent: null,
      clients:[]
    }
    this.token=sessionStorage.getItem('auth-user');
    this.currentUser = this.getDecodedAccessToken(this.token); 
    this.getCourses();  
  }

  getCourses(){
    this.Courseservice.getCoursesByAgent(this.currentUser.sub).subscribe(res => { this.listCourses= res});
  }

  searchdata() {  
    debugger;  
     this.Courseservice.getCoursesByDate(this.startDate,this.endDate).subscribe((res: any) => {  
             
         this.listCourses=res;   
     })  
   }

  deleteCourse(id:number){
    this.Courseservice.deleteCourseById(id).subscribe(() => this.listCourses= [(this.Course.numCourse,
      this.Course),... this.listCourses]);
      this.toastr.success('Course supprimée avec succès.');
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastr.error('Something went wrong.');
      }
      window.location.reload();
  }

    Search(){
      if(this.depart ==""){
        this.ngOnInit();
      }
      else{
        this.listCourses=this.listCourses.filter(res =>{
           return res.depart.toLocaleLowerCase().match(this.depart.toLocaleLowerCase());
        });
      }
    }

    key: string='';
    key1: boolean=true;
    reserve: boolean =false;
    sort(key){
      this.key= key;
      this.reserve = !this.reserve;
    }
    sort1(key1){
      this.key1=key1;
      this.reserve = !this.reserve;
    }



  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClick() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
    });
  }

}


