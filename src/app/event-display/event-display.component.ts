import { Component, Input, OnInit } from '@angular/core';
import {trigger,state,style,animate,transition,} from '@angular/animations';
import {formatDate} from '@angular/common';
import { ApiService } from '../shared/api.service';
import { ModelsService } from '../shared/models.service';
import { ActivityDetails } from '../shared/activity-details.model';
import { FriendDetails } from '../shared/friend-details.model';
import { Weather } from '../shared/weather.model';
import { first, tap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.css'],
  animations: [
    trigger('fade', [ transition( 'void => *',[style({opacity: 0}),animate(2000,style({opacity: 1}))])]),
    trigger('text1', [ transition( 'void => *',[style({opacity: 0}),animate(2000,style({opacity: 1}))])]),
    trigger('text2', [ transition( 'void => *',[style({opacity: 0}),animate(2000,style({opacity: 1}))])]),
  ]
  
})
export class EventDisplayComponent implements OnInit {
  

  constructor(private api: ApiService, public model:ModelsService) { }

  public CoordModel = {
    Latitude :  Number( sessionStorage.getItem('Latitude')) ,
    Longitude  : Number( sessionStorage.getItem('Longitude')),
    Time:  formatDate( Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530')
   
  }


  //Method called on initialization of the component
   ngOnInit(): void {

    this.getFriends();
    this.GetActivityDetails();
    this.GetWeatherDetails();
    
    this.model.activityDet = [];
    this.model.weather = [];
    this.model.friend = [];
    this.model.coord= [];
   
  }



  ////////////////////////////////////////////////////////////////
  //This function adds the activity details to the activity details model
  async GetActivityDetails(){
    
      const act = await this.api.getActivityDetails();
      this.model.activityDet.push(act);


  }

  ////////////////////////////////////////////////////////////////
  //Gets the weather details from the service
  async GetWeatherDetails(){

    const wEather = await this.api.getWeatherDetails()
    this.model.weather.push(wEather);     

  }

////////////////////////////////////////////////////////////////
//This function gets recieves the friend details from the service and adds them to the model to be bound to the view
  async getFriends(){
    
      let Friend = (await this.api.getFriendDetails());
      this.model.friend.push(Friend);

  }
}
