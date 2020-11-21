import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  classes = [
    {
      title: "Yoga with Demir!",
      createdBy: "Demir Mensah",
      description: "Beginner's yoga session. All you need is a yoga mat and some space around you!",
      category: "Yoga",
      price: "5",
      startDate: new Date().getTime(),
      endDate: (new Date().getTime() + 3600)
    }
  ];
  coaches = [

  ];

  constructor() { }

  ngOnInit(): void {
    // fetch & store classes + coach profiles
  }

}
