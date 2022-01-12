import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'app/confirm-dialog/confirm-dialog.component';
import { Member } from 'app/models/member';
import { Publication } from 'app/models/publication';
import { PublicationService } from 'app/services/publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titre','dateapparition', 'type'];

  dataSource:Publication[] = [];
  auteurs:Member[] = [];
  //dataSource = new MatTableDataSource<Publication>()
  
  pubs: Publication[] = [];

  constructor(public PS:PublicationService, public dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    //this.PS.getAllPublications().then((data) => this.dataSource = data)
    //console.log(this.dataSource)
    //console.log(this.PS.getAllPublications())
    //this.getAllData()
    //this.dataSource=this.PS.tab;
    //console.log()

      this.PS.getAllPublications().subscribe(
      (result: Publication[]) => {
        console.log(result)
        result.forEach(

          element => {
            const pub = new Publication(element.id,element.titre,formatDate(element.dateapparition, 'yyyy-MM-dd', 'en-US'),element.type);
            //this.pubs.push(pub);
            this.dataSource.push(pub);
          }

        );
       
        console.log(this.dataSource)
      }
    );
  
  }


  getAllData(): void{
   // this.PS.getAllPublications().then((data) => this.dataSource = data)
  }
  getAllData2(): void {
    //this.PS.getAllPublications().subscribe(
      //(result: Publication[]) => {
        //console.log(result)
        //result.forEach(

          //element => {
            //const pub = new Publication(element.id,element.titre,element.dateapparition,element.type);
            //this.pubs.push(pub);
         // }

        //);
      //}
    //);

   // this.dataSource.data = this.pubs;

    
  } 

  delete(id: number): void {
    const message = 'Are you sure you want to do delete this article?';
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    console.log(id);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult === true) {
        this.PS.deletePublication(id).subscribe(
          result => {
            console.log(result);
          }
        );
      }
    });


  }

}


//<button mat-mini-fab color="accent" type="submit" class="btn btn-danger pull-right" >+</button>