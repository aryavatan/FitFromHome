import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { ClassComponent } from './class/class.component';
import { ClassListComponent } from './explore/class-list/class-list.component';
import { CoachListComponent } from './explore/coach-list/coach-list.component';
import { ClassListFilerPipe } from './explore/class-list/class-list-filter.pipe';
import { CoachListFilerPipe } from './explore/coach-list/coach-list-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    ExploreComponent,
    ProfileComponent,
    ClassComponent,
    ClassListComponent,
    CoachListComponent,
    ClassListFilerPipe,
    CoachListFilerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
