import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { HomeComponent } from './home/home.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { ClassComponent } from './class/class.component';
import { WatcherComponent } from './watcher/watcher.component';
import { ClassListComponent } from './explore/class-list/class-list.component';
import { ClassListFilerPipe } from './explore/class-list/class-list-filter.pipe';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddClassComponent } from './profile/add-class/add-class.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


const config: SocketIoConfig = { 
  url: 'http://localhost:4102', 
  options : {
    credentials: true
  }
};

@NgModule({
  declarations: [
    AppComponent,
    BroadcastComponent,
    HomeComponent,
    ExploreComponent,
    ProfileComponent,
    ClassComponent,
    ClassListComponent,
    ClassListFilerPipe,
    LoginComponent,
    SignupComponent,
    AddClassComponent,
    WatcherComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
