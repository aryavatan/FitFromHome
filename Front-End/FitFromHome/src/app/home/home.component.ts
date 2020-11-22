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

  userClasses: Class[] = []

  userId = localStorage.getItem("id");

  constructor(private httpService: HTTPService) { }

  ngOnInit(): void {
    this.httpService.getAllClasses().subscribe(classArray => {
			this.classes = classArray;
      console.log("HOME:"+this.classes);
    });
    
    // this.httpService.getClassesForUser(this.userId).subscribe(classArray => {
    //   this.userClasses = classArray;
    //   console.log(this.userClasses);
    // })

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

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ]


}



