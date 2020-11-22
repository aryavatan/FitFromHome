import { 
  Component, 
  OnInit,
  ChangeDetectionStrategy} from '@angular/core';
  import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
  } from 'date-fns';

import { 
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
 } from 'angular-calendar';
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

  userClasses: Class[]

  id: "uvVmYAWZMKj0XLZP5JJJ"

  constructor(private httpService: HTTPService) { }

  ngOnInit(): void {
    this.httpService.getAllClasses().subscribe(classArray => {
			this.classes = classArray;
      console.log("HOME:"+this.classes);
    });

    this.httpService.getUsersClasses(this.id).subscribe(classArray => {
      this.userClasses = classArray;
      console.log(this.userClasses);
    })
  }
  
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();
 
  setView(view: CalendarView) {
    this.view = view;
  }

  modalData: {
    event: CalendarEvent;
  };

}



