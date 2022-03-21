import { Injectable } from '@angular/core';
import { BehaviorSubject,Subject,ReplaySubject,Observable} from 'rxjs';

//import models
import { Weather } from './weather.model';
import { ActivityDetails } from './activity-details.model';
import { FriendDetails } from './friend-details.model';
import { CoordModel } from './coord-model.model';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  weatherDetails!: Weather;

  weather!: Weather[];

  activityDetails!: ActivityDetails;

  activityDet!: ActivityDetails[];

  friendDetails!: FriendDetails;

  friend!: FriendDetails[];

  DestinationCoordinates!: CoordModel;

  coord!: CoordModel[];

  constructor() { }

  setCoords(data:any){

    sessionStorage.setItem("Longitude", data.Longitude);
    sessionStorage.setItem("Latitude", data.Latitude);
    
  }

}
