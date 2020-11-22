import { Component } from '@angular/core';
import { HTTPService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FitFromHome';

  constructor(private httpService: HTTPService) {}

  logout() {
    this.httpService.logout();
  }
}
