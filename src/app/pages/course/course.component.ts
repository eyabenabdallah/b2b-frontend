import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationEnd, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course/course.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

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
  constructor(private Courseservice: CourseService,private modalService: NgbModal, public dialog: MatDialog, private router: Router, private toastr: ToastrService) { this.dataSource = new MatTableDataSource(this.listCourses);}
  getDecodedAccessToken(token: string): any {
    //try {
      return jwt_decode(token);
    /*} catch(Error) {
      return null;
    }*/
  }

  ngOnInit(): void {
    this.getCourses();
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
        
  }

  getCourses(){
    this.Courseservice.getTodaysCourses().subscribe(res => { this.listCourses= res});
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
      this.toastr.success('Course removed successfully.');
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastr.error('Something went wrong.');
      }
      window.location.reload();
  }

  editCourse(Course: Course){
    this.Courseservice.editCourse(Course).subscribe();
    window.location.reload();
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


  //displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  //dataSource: MatTableDataSource<CourseData>;
  

  /*constructor() {
    // Create 100 users
    const users = Array.from({length: 20}, (_, k) => createNewCourse(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }*/

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

  openUpdateCourseDialog(course: Course): void {
    const dialogRef = this.dialog.open(UpdateCourseModal, {
      data: {
        title: "Mise à jour de la course:",
        course: course // Pass the selected course as data
      }
    });
  
    dialogRef.afterClosed().subscribe((updatedCourse: Course) => {
      if (updatedCourse) {
        this.editCourse(updatedCourse);
        this.toastr.success('Course ajoutée avec succès');
        //window.location.reload();
      }
    }, (error: any) => {
      this.toastr.error("Something went wrong.");
    });
  }

}

@Component({
  selector: 'update-course-modal',
  templateUrl: 'update-course-modal.html',
})
export class UpdateCourseModal {
  course: Course; // Rename the property to lowercase
  
  constructor(
    public dialogRef: MatDialogRef<UpdateCourseModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.course = data.course; // Assign the course from data to the component property
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
