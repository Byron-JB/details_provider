import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { first, tap } from 'rxjs';

import { ModelsService } from './models.service';
import { ActivityDetails } from './activity-details.model';
import { FriendDetails } from './friend-details.model';
import { Weather } from './weather.model';
import { jsDocComment } from '@angular/compiler';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient , private model:ModelsService ,private datePipe: DatePipe  ) { }

  public TempFriend:any = {};
  ////////////////////////////////////////////////////////////////
  //Gets the current weather information of the location that you choose
  async getWeatherDetails(){

    let Temp:any = [];
    let Main:any =[];
    let Weather:any ={};
    let Wind:any ={};
    let Cloud:any ={};
    let TemperatureDetails:any = {};

    let temperature:any;
    let maxTemp:number =0;
    let minTemp:number=0;
    let humidity:number=0;
    let tempFeeling:number=0;
    let airPressure: number = 0;
    let description: string = "";
    let windSpeed: number = 0;
    let distAboveSea: number = 0;
    let iconLink: string = "";
    let cloudCover:number = 0;

    await this.http.get("https://fcc-weather-api.glitch.me/api/current?lat=-26.3394198&lon=27.9807945").pipe(tap((data:any) =>{

      Main = data['main'];
      
      temperature = Main['temp'];
      tempFeeling = Main['feels_like'];
      maxTemp = Main['temp_max'];
      minTemp = Main['temp_min'];
      humidity = Main['humidity'];
      airPressure = Main['pressure'];
      distAboveSea = Main['sea_lever'];
      

      Weather = data['weather'];
      Temp= Weather;
      Weather = Temp[0];

      description = Weather['description'];
      iconLink = Weather['icon'];

      Wind = data['wind'];
      windSpeed = Wind['speed'];

      Cloud = data['clouds'];
      cloudCover = Cloud['all'];

      TemperatureDetails = {Temperature: temperature, TempFeeling:tempFeeling ,MinTemp:minTemp ,MaxTemp:maxTemp, Humidity:humidity,AirPressure:airPressure,
              Description: description,WindSpeed:windSpeed,DistAboveSea:distAboveSea,IconLink: iconLink,CloudCover:cloudCover};
    }),first()).toPromise();

      return TemperatureDetails;
  }
  ////////////////////////////////////////////////////////////////
  //Gets details of the people who will be coming on the trip
  async getFriendDetails(): Promise<any> {

    //Variables
    let Details:any =[];
    let Friends:any ={};
    let Temp:any ={};
   

    let TempString:any;
    let gender:string="";
    let title:string="";
    let firstName:string="";
    let lastName:string="";
    let Age:number=0;
    let imageUrl:string= "";
    
    await this.http.get("https://randomuser.me/api/").pipe(tap((data: any) => {

      Details = data['results'];
      Friends = Details[0];

      gender = Friends['gender'];

      Temp = Friends['name'];
      title = Temp["title"];
      firstName = Temp["first"];
      lastName = Temp["last"];

      Temp = Friends['picture'];
      imageUrl = Temp['large']
      //Date of Birth calculation
      Temp = Friends["dob"];
      TempString = this.datePipe.transform(Temp["date"],'yyyy-MM-dd');
      var TimeDiff = Math.abs(Date.now() - new Date(TempString).getDay());
      Age = Math.floor(TimeDiff / (1000 * 3600 * 24) / 365.25);
      //Assigns the person's details to variables which are returned to the component
      this.TempFriend = {Title: title, FirstName: firstName, LastName: lastName ,DateOfBirth: Age,Gender: gender ,ImageUrl: imageUrl};
      
      //Returns a Json object
      

    }),first()
    ).toPromise();
    return this.TempFriend;
      
     
  }
  
  ////////////////////////////////////////////////////////////////
  //gets activity details from API service
  async getActivityDetails() {
    
    let ActDetails:any = {};
    let Temp:any = []
    await this.http.get("https://www.boredapi.com/api/activity").pipe(tap((data:any) => {

      Temp = data['price'];
      
      ActDetails = {activity: data['activity'], price: Temp}; 

    }),first()).toPromise();

      return ActDetails;
  }
}
