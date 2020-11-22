import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BroadcastComponent } from './broadcast/broadcast.component';
import { WatcherComponent } from './watcher/watcher.component';


const routes: Routes = [
  {path: 'broadcast', component: BroadcastComponent},
  {path: 'watcher', component: WatcherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
