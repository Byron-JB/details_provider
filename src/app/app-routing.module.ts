import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//component import
import { HomeComponent } from './home/home.component'; 
import { EventDisplayComponent } from './event-display/event-display.component';

const routes: Routes = [
  {path: "" , redirectTo :'/home' , pathMatch: 'full'},
  {path: 'home', component:HomeComponent },
  {path: 'event', component:EventDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
