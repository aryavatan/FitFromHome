import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HTTPService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'FitFromHome';

  isAuthenticated = false;
  private isAuthListenerSub: Subscription;

  isTrainer = false;
  private isTrainerListenerSub: Subscription;

  constructor(private httpService: HTTPService) {}

  ngOnInit() {
    this.isAuthenticated = this.httpService.getIsAuth();
    this.isAuthListenerSub = this.httpService.getAuthStatusListener().subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    this.isTrainer = this.httpService.getIsTrainer();
    this.isTrainerListenerSub = this.httpService.getTrainerStatusListener().subscribe(isTrain => {
      this.isTrainer = isTrain;
    });
  }

  logout() {
    this.httpService.logout();
  }

  ngOnDestroy() {

  }
}
