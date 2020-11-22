import { 
  Component, 
  OnInit,
  ChangeDetectionStrategy} from '@angular/core';

  import {
    CalendarView,
  } from 'angular-calendar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
  
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();
 
  setView(view: CalendarView) {
    this.view = view;
  }
  
}



