import { Component } from '@angular/core';

@Component({
    selector: 'app-class-list',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent {
    classes = [
        {
          id: '123',
          title: "Yoga with Demir!",
          createdBy: "Demir Mensah",
          description: "Beginner's yoga session. All you need is a yoga mat and some space around you!",
          category: "Yoga",
          price: "5",
          startDate: new Date().getTime(),
          endDate: (new Date().getTime() + 3600)
        },
        {
          id: '124',
          title: "Weight with Arya!",
          createdBy: "Arya Vatan",
          description: "Weights session with Arya. Tiem to get big!",
          category: "Strength",
          price: "15",
          startDate: new Date().getTime(),
          endDate: (new Date().getTime() + 3600)
        }
      ];

      constructor() {}

}