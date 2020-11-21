import { Component } from '@angular/core';

@Component({
    selector: 'app-coach-list',
    templateUrl: './coach-list.component.html',
    styleUrls: ['./coach-list.component.scss']
})
export class CoachListComponent{
    coaches = [
        {
          name: "demir",
          category: "yoga"
        },
        {
          name: "arya",
          category: "strenght"
        }
      ];
    constructor() {

    }
}