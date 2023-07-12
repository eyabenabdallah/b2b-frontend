import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {  MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { Societe } from 'src/app/models/societe';
import { ClientService } from 'src/app/services/client/client.service';
import { SocieteService } from 'src/app/services/societe/societe.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  listClients: Client[];
  closeResult! : string;
  form : boolean = false;
  Client : Client = new Client();
  prenom:any;
  p:number=1;
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  //@ViewChild(MatSort) sort: MatSort;
  constructor(private Clientservice: ClientService, private modalService: NgbModal, public dialog: MatDialog, private toastr: ToastrService) { this.dataSource = new MatTableDataSource(this.listClients);}

  ngOnInit(): void {
    this.getAllClients();
    this.Client = {
      idClient: null,
      nom: null,
      prenom: null,
      tel: null,
      activite: null,
      societe: null,
      courses: null
    }
        
  }

  getAllClients(){
    this.Clientservice.getClients().subscribe(res => {this.listClients= res});
  }

   deleteClient(id:number){
     this.Clientservice.deleteClientById(id).subscribe(() => this.listClients= [(this.Client.idClient,
       this.Client),... this.listClients]);
       this.toastr.success('Client removed successfully.');
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastr.error('Something went wrong.');
      }
       window.location.reload();
   }

  // editClient(Client: Client){
  //   this.Clientservice.updateClient(Client).subscribe();
  //   window.location.reload();
  // }

  addNewClient(newClient:Client){

    this.Clientservice.addClient(newClient).subscribe(() => {this.listClients= [(this.Client.idClient,
      this.Client),... this.listClients];}
      ) 
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
      if(this.prenom ==""){
        this.ngOnInit();
      }
      else{
        this.listClients=this.listClients.filter(res =>{
           return (res.prenom).toLocaleLowerCase().match(this.prenom.toLocaleLowerCase());
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


  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientModal, {
      data: { title: "Ajouter un nouveau personnel:" },
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.addNewClient(result);
        this.toastr.success('Personnel ajouté avec succès.');
        // window.location.reload();
      }
    }, (error: any) => {
      this.toastr.error("Something went wrong.");
    });
  }

}


@Component({
  selector: 'add-client-modal',
  templateUrl: 'add-client-modal.html',
})
export class AddClientModal {
  client: Client = new Client();
  listSocietes: Societe[];

  constructor(
    private societeService: SocieteService,
    private clientService: ClientService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AddClientModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.getAllSocietes();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addClient(): void {
    const societeId = this.client.societe; // Retrieve the selected societe ID
    this.client.societe = { idSociete: societeId } as unknown as Societe; // Set the societe field with the retrieved ID
  
    // Call the API to add the client
    this.clientService.addClient(this.client).subscribe(
      (response) => {
        this.toastr.success('Personnel ajouté avec succès.');
      },
      (error) => {
        console.error('Error adding personnel:', error);
        this.toastr.error('Failed to add personnel.');
      }
    );
  
    this.dialogRef.close();
  }

  getAllSocietes(): void {
    this.societeService.getSocietes().subscribe((res: Societe[]) => {
      this.listSocietes = res;
    }, (error: any) => {
      console.error("Error retrieving societes:", error);
    });
  }
}
