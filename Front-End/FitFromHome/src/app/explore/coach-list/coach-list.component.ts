import { Component } from '@angular/core';
import { Coach } from '../coach.model';

@Component({
    selector: 'app-coach-list',
    templateUrl: './coach-list.component.html',
    styleUrls: ['./coach-list.component.scss']
})
export class CoachListComponent{
    searchWord: string;
    coaches: Coach[] = [
        {
          coachId: "1",
          name: "demir",
          category: "yoga"
        },
        {
          coachId: "2",
          name: "arya",
          category: "strength"
        }
      ];
    constructor() {

    }
}