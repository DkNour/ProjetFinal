import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from 'app/models/member';
import { Publication } from 'app/models/publication';
import { MemberService } from 'app/services/member.service';
import { PublicationService } from 'app/services/publication.service';
import { element } from 'protractor';

@Component({
  selector: 'app-user-profile',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {
  form: any;
  currentId: any;
  item1: any;
  form2: any;

  members:Member[] = [];
  auters:Member[] = [];
  selected:any = [];

  initform(item : any, auteur : Member): void{
    this.form = new FormGroup({
      titre: new FormControl(item?.titre,[Validators.required]),
      dateapparition: new FormControl(item?.dateapparition,[Validators.required]),
      type: new FormControl(item?.type,[Validators.required])
    })
    this.form2 = new FormGroup({
      auteur: new FormControl(this.members,[Validators.required])
    })
  }
  
  constructor(public PS:PublicationService, private router : Router, private activatedRoute : ActivatedRoute, public MS:MemberService) { }

  ngOnInit() {
    this.currentId=this.activatedRoute.snapshot.params.id;
    if (!!this.currentId){
      this.PS.getPublicationById(this.currentId).subscribe(
        data => {
          const item = new Publication(data.id,data.titre,formatDate(data.dateapparition, 'yyyy-MM-dd', 'en-US'),data.type);
          this.item1 = item; this.initform(this.item1,null); console.log(this.item1);
        })

      //this.PS.getPublicationById(this.currentId).subscribe( item => { this.item1 = item; this.initform(this.item1); })
      //this.PS.getPublicationById(this.currentId).then((item) => {this.item1=item ; this.initform(this.item1);})
      //console.log(this.currentId)
      //console.log(this.item1)
    } 
    else{this.initform(null,null)
      //console.log("hello")
    }
    this.MS.getAllMembers().subscribe(
      (res: Member[]) => {
        //console.log(res)
        res.forEach(

          member => {
            const pub = new Member(member.id,member.nom,member.prenom);
            this.members.push(pub);
          }

        );       
        console.log(this.members)
      }
    );

    this.MS.getAuteurs(this.currentId).subscribe(
      (data: Member[])=> {
        data.forEach(
          auteur => {
            const aut = new Member(auteur.id,auteur.nom,auteur.prenom);
            this.selected.push(aut);
          }
        );       
        console.log(this.selected)
      }
    )

  }
  OnSubmit(): void {
    const objectToSubmit :Publication = {...this.item1,...this.form.value};

    this.PS.create(objectToSubmit)
      .subscribe(
        response => {
          console.log(objectToSubmit);
        },
        error => {
          console.log(error);
        });
        //this.members.push(selected)
        console.log(this.selected)
        this.getSelectedValue()
  }

  OnAdd(): void {
    if (this.selected.length != 0 ){
      //his.selected.forEach(function(member){
        //this.MS.affecterauteurTopublication(this.currentId, member.id)
        //console.log(member)      
     // }); 
      console.log(this.selected.length )  
      this.selected.forEach(element => {
        //console.log(element);
        console.log("hello nour");
        this.MS.affecterauteurTopublication(this.currentId, element.id).subscribe(        
          response => {
          console.log("done nour");
        },
        error => {
          console.log("error");
        })
        console.log(this.currentId);
        console.log(element.id);
      });
     // console.log(this.currentId);   
    }
  }

  getSelectedValue(){  
    console.log(this.selected);  
  }

}
