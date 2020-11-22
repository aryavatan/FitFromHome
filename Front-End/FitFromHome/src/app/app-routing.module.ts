import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassComponent } from './class/class.component';
import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { WatcherComponent } from './watcher/watcher.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] },
  { path: 'profiles', component: ProfileComponent },
  { path: 'profiles/:id', component: ProfileComponent },
  { path: 'class/:id', component: ClassComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'broadcast', component: BroadcastComponent},
  { path: 'watcher', component: WatcherComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
