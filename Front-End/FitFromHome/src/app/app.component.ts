import { Component } from '@angular/core';
import { SocketIOService } from './services/socket.io.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FitFromHome';
  constructor (
    ){}
}
