import { 
  Component, 
  OnInit,
  ChangeDetectionStrategy} from '@angular/core';

import { CalendarView } from 'angular-calendar';
import { Class } from '../explore/class.model';
import { HTTPService } from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  classes: Class[] = []

  constructor(private httpService: HTTPService) { }

  ngOnInit(): void {
    this.httpService.getAllClasses().subscribe(classArray => {
			this.classes = classArray;
      console.log("HOME:"+this.classes);
    });
  }
  
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();
 
  setView(view: CalendarView) {
    this.view = view;
  }


}



