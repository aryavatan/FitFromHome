import { Component, OnInit } from '@angular/core';
import { Profile, TrainersClassList } from './profile.model';
import { ClassListComponent } from '../explore/class-list/class-list.component';
import { ActivatedRoute } from '@angular/router';
import { HTTPService } from '../services/http.service';

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
     }
    
  ]
  profileId;

  constructor(private route: ActivatedRoute, private httpService: HTTPService) { 
    if (this.route.snapshot.params['id']) {
      this.profileId = this.route.snapshot.paramMap.get('id');
    }
  }

  ngOnInit(){
    this.httpService.getClassesForUser(this.profileId).subscribe(response => {
      console.log(response)
    });
  }

}
