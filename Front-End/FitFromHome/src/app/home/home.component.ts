import { 
  Component, 
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef} from '@angular/core';
 // import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  classes: Class[] = []
  userClasses: any = []

  start: string 
  end: string
  title: string

  userId = localStorage.getItem("id");

  constructor(private httpService: HTTPService) { 
    
  }

  ngOnInit(): void {
    
    this.httpService.getClassesForUser(this.userId).then(classArray => {
      this.userClasses = classArray;
      console.log(this.userClasses);
    });

    this.httpService.getAllClasses().subscribe(classArray => {
			this.classes = classArray;
      console.log("HOME:"+this.classes);
      for (let i = 0; i < this.userClasses.length ; i++) {
        this.start = this.userClasses[i].startDate;
        this.end = this.userClasses[i].endDate;
        this.title = this.userClasses[i].title;
      }
    });
    
    // this.userClasses.forEach((index) => {
    //   this.start = this.userClasses[index].startDate
    //   this.end = this.userClasses[index].endDate
    //   this.title = this.userClasses[index].title
      
    // });
  }

  activeDayIsOpen: boolean = true;
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  modalData: {
    event: CalendarEvent;
  };

  events: CalendarEvent[] = [
    {
      start: new Date(this.start),
      end: new Date(this.end),
      title: this.title
    },
    {
      start: new Date("2020-11-25T13:00:00"),
      end: new Date("2020-11-25T15:00:00"),
      title: "HIIT With Chelsea"
    }
  ]
  handleEvent(event: CalendarEvent): void {
    this.modalData = { event };
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}



