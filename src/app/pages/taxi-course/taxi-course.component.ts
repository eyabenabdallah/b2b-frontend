import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import jwt_decode from 'jwt-decode';
import { Course } from 'src/app/models/course';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CourseService } from 'src/app/services/course/course.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-taxi-course',
  templateUrl: './taxi-course.component.html',
  styleUrls: ['./taxi-course.component.css']
})
export class TaxiCourseComponent implements OnInit {

  listCourses: Course[];
  Course:Course;
  currentUser: any;
  token: string;
  connectedUser: User;
  dataSource: MatTableDataSource<Course>;
  closeResult! : string;
  form : boolean = false;
  p:number=1;
  depart:string;
  startDate:any;
  endDate:any;
  count: number;
  somme: number;

  constructor(private usersService: UsersService, private coursesService: CourseService, private modalService: NgbModal, public dialog: MatDialog, private router: Router) { this.dataSource = new MatTableDataSource(this.listCourses);}
  getDecodedAccessToken(token: string): any {
    //try {
      return jwt_decode(token);
    /*} catch(Error) {
      return null;
    }*/
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  this.countCourses();
  this.prixCourses();
  }


  getCourses(){
    this.coursesService.getCoursesByUser(this.currentUser.sub).subscribe(res => { this.listCourses= res});
  }

  countCourses(){
    this.coursesService.countCourses(this.currentUser.sub).subscribe(res => { this.count= res});
  }

  prixCourses(){
    this.coursesService.sumPrixCourses(this.currentUser.sub).subscribe(res => { this.somme= res});
  }

  searchdata() {  
    debugger;  
     this.coursesService.getCoursesByDate(this.startDate,this.endDate).subscribe((res: any) => {  
             
         this.listCourses=res;   
     })  
   }


  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = 'Closed with: $result';
        }, (reason) => {
            this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = 'Closed with: $result';
      }, (reason) => {
          this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = 'Closed with: $result';
        }, (reason) => {
            this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        });
    }
  }
  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  'with: $reason';
      }
  }

    closeForm(){

    }
    cancel(){
      this.form = false;
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
