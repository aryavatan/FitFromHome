import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BroadcastComponent } from './broadcast/broadcast.component';
 
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { WatcherComponent } from './watcher/watcher.component';

const config: SocketIoConfig = { url: 'http://localhost:4100', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    BroadcastComponent,
    WatcherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
