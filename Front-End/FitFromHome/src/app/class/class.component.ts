import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class } from '../explore/class.model';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  // id of class clicked
  selectedId;

  classes: Class[] = [
    {
      classId: '123',
      title: "Yoga with Demir!",
      createdBy: "Demir Mensah",
      description: "Beginner's yoga session. All you need is a yoga mat and some space around you!",
      category: "Yoga",
      price: "5",
      startDate: new Date().getTime(),
      endDate: (new Date().getTime() + 3600)
    }
  ];

  constructor(private route: ActivatedRoute) {
    if (this.route.snapshot.params['id']) {
      this.selectedId = this.route.snapshot.paramMap.get('id');
    }
   }

  ngOnInit(): void {
    // would need to call getClass(this.selectedId) here and store fields on a local copy of the class
  }

}
