import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Societe } from 'src/app/models/societe';
import { SocieteService } from 'src/app/services/societe/societe.service';

@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.css']
})
export class SocieteComponent implements OnInit {

  listSocietes: Societe[];
  closeResult! : string;
  form : boolean = false;
  Societe : Societe = new Societe();
  nom:any;
  p:number=1;
  connectedSociete: Societe = new Societe();
  dataSource: MatTableDataSource<Societe>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  //@ViewChild(MatSort) sort: MatSort;
  constructor(private Societeservice: SocieteService,private modalService: NgbModal, public dialog: MatDialog, private toastr: ToastrService) { this.dataSource = new MatTableDataSource(this.listSocietes);}

  ngOnInit(): void {
    this.getAllSocietes();
    this.Societe = {
      idSociete: null,
      nom: null,
      adresse:null,
      contact: null
    }
        
  }

  getAllSocietes(){
    this.Societeservice.getSocietes().subscribe(res => { this.listSocietes= res});
  }

  addNewSociete(newSociete:Societe){

    this.Societeservice.addSociete(newSociete).subscribe(() => {this.listSocietes= [(this.Societe.idSociete,
      this.Societe),... this.listSocietes];}
      ) 
  }

  deleteSociete(id:number){
    this.Societeservice.deleteSocieteById(id).subscribe(() => this.listSocietes= [(this.Societe.idSociete,
      this.Societe),... this.listSocietes]);
      this.toastr.success('Client enregistré avec succès.');
      (error: HttpErrorResponse) => {
        console.error(error);
        this.toastr.error('Something went wrong.');
      }
      window.location.reload();
  }

  editSociete(Societe: Societe){
    this.Societeservice.editSociete(Societe).subscribe();
  }

    Search(){
      if(this.nom ==""){
        this.ngOnInit();
      }
      else{
        this.listSocietes=this.listSocietes.filter(res =>{
           return (res.nom).toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
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

  openAddSocieteDialog(): void {
    const dialogRef = this.dialog.open(AddSocieteModal, {
      data: { title: "Ajouter un nouveau client:" },
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.addNewSociete(result);
        this.toastr.success('Client ajouté avec succès.');
        window.location.reload();
      }
    }, (error: any) => {
      this.toastr.error("Something went wrong.");
    });
  }

  openUpdateSocieteDialog(societe: Societe): void {
    const dialogRef = this.dialog.open(UpdateSocieteModal, {
      data: {
        title: "mise à jour du client:",
        societe: societe // Pass the selected societe as data
      }
    });
  
    dialogRef.afterClosed().subscribe((updatedSociete: Societe) => {
      if (updatedSociete) {
        this.editSociete(updatedSociete);
        this.toastr.success('Le client a bien été mis à jour.');
        //window.location.reload();
      }
    }, (error: any) => {
      this.toastr.error("Something went wrong.");
    });
  }

}

@Component({
  selector: 'add-societe-modal',
  templateUrl: 'add-societe-modal.html',
})
export class AddSocieteModal {
  Societe : Societe = new Societe();
  constructor(
    public dialogRef: MatDialogRef<AddSocieteModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'update-societe-modal',
  templateUrl: 'update-societe-modal.html',
})
export class UpdateSocieteModal {
  societe: Societe; // Rename the property to lowercase
  
  constructor(
    public dialogRef: MatDialogRef<UpdateSocieteModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.societe = data.societe; // Assign the societe from data to the component property
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
