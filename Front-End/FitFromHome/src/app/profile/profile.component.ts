import { Component, OnInit } from '@angular/core';
import { Profile, TrainersClassList } from './profile.model';
import { ClassListComponent } from '../explore/class-list/class-list.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: Profile[] = [ 
      {
        fullName: "Chelsea",
        id: "123",
        classId: "3",
        category: "Fitness",
        description: "I'm healthy",
        isTrainer: true
    }
  ]

  trainersClass: TrainersClassList[] = [
    {
      classes:
        { 
          
        classId: "1",
        title: "yoga class with chelsea",
        createdBy: "Chelsea",
        description: "this is a yoga class",
        category: "yoga",
        price: "15",
        startDate: 12/20/20,
        endDate: 12/20/20
      }
     },
    {
      classes: 
        { 
        classId: "2",
        title: "HIIT class with chelsea",
        createdBy: "Chelsea",
        description: "this is a HIIT class",
        category: "HIIT",
        price: "15",
        startDate: "12/12/20",
        endDate: "12/12/20"
      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
