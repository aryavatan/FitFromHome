import { Component, OnInit } from '@angular/core';
import { Profile, TrainersClassList } from './profile.model';
import { ClassListComponent } from '../explore/class-list/class-list.component';
import { ActivatedRoute } from '@angular/router';
import { HTTPService } from '../services/http.service';
import { Class } from '../explore/class.model';

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

  fetchedClasses;
  fetchedCoach;

  coachId;
  constructor(private httpService: HTTPService) {
   }

  ngOnInit() {
    this.coachId = localStorage.getItem('id');
    this.httpService.getClassesCreatedByCoach(this.coachId)
    .subscribe(classesArr => {
      this.fetchedClasses = classesArr;
      console.log(this.fetchedClasses)
    });

    this.httpService.getUser(this.coachId).subscribe(response => {
      this.fetchedCoach = response.user;
    });
  }

}
