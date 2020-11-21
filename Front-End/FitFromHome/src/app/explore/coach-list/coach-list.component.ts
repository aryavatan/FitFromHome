import { Component } from '@angular/core';

@Component({
    selector: 'app-coach-list',
    templateUrl: './coach-list.component.html',
    styleUrls: ['./coach-list.component.scss']
})
export class CoachListComponent{
    coaches = [
        {
          id: "1",
          name: "demir",
          category: "yoga"
        },
        {
          id: "2",
          name: "arya",
          category: "strenght"
        }
      ];
    constructor() {

    }
}