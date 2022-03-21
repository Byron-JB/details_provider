import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})

export class AppComponent {
  title = 'details_provider';


  data: any;

  public receiveMessage($event: any) {
    this.data = $event;
  }
}


