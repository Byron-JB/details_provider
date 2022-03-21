import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl,FormGroup } from '@angular/forms';
import { ModelsService } from '../shared/models.service';
import { Router } from '@angular/router';
import {trigger,state,style,animate,transition,} from '@angular/animations';
import { first, tap } from 'rxjs';

import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ModelsService],
  animations: [
    trigger('fade', [ transition( 'void => *',[style({opacity: 0}),animate(2000,style({opacity: 1}))])])

  ]
})
export class HomeComponent implements OnInit {

  constructor(public modelservice:ModelsService, private api: ApiService, private router:Router) { }

  //Used to store values for the coordinates form
   CoordinateForm = new FormGroup({
    Latitude:  new FormControl(''),
    Longitude: new FormControl('') 
  });

  @Output() coordinates = new EventEmitter<string>();
  private B:string = 'Latitude';

  ngOnInit(): void {
   
  }

  ResetForm(form?: NgForm){
    
  }


  //gets coordinates from form and sends to next component
  async onSubmit(){
    
    
    this.modelservice.setCoords(this.CoordinateForm.value);

    this.router.navigate(['event']);
  }

  public Go(){

    
    
     
     
     
  }

}
