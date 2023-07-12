import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Taxi } from 'src/app/models/taxi';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})
export class TaxisComponent implements OnInit {

  listTaxis: User[];
  closeResult! : string;
  form : boolean = false;
  User : User = new User();
  username:any;
  p:number=1;
  connectedUser: User = new User();
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  constructor(private Userservice: UsersService,private modalService: NgbModal) { this.dataSource = new MatTableDataSource(this.listTaxis);}

  ngOnInit(): void {
    this.getAllTaxis();
    this.User = {
      idLog: null,
      username: null,
      password: null,
      role: null,
      active: null,
      nom: null,
      prenom: null,
      tel: null,
      taxi:{
        idTaxi: null,
        numTaxi: null,
        adresse: null
      }
    }
    
    //this.Userservice.getUsers().subscribe((data:User[]) => this.listUsers = data); 
    
  }

  getAllTaxis(){
    this.Userservice.getTaxi().subscribe(res => { this.listTaxis= res});
  }

  fireUser(id:number){
    this.Userservice.fireAgent(id).subscribe(() => /*this.getAllUsers*/this.listTaxis= [(this.User.idLog,
      this.User),... this.listTaxis]);
      window.location.reload();
  }

  editUser(User: User){
    this.Userservice.updateUser(User).subscribe();
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
      if(this.username ==""){
        this.ngOnInit();
      }
      else{
        this.listTaxis=this.listTaxis.filter(res =>{
           return res.username.toLocaleLowerCase().match(this.username.toLocaleLowerCase());
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
  //dataSource: MatTableDataSource<UserData>;
  

  /*constructor() {
    // Create 100 users
    const users = Array.from({length: 20}, (_, k) => createNewUser(k + 1));

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

}
