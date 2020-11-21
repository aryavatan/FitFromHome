import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  classesSelected = true;

  constructor() { }

  ngOnInit(): void {
    // fetch & store classes + coach profiles
  }

  toggleCategory() {
    this.classesSelected = !this.classesSelected;
  }
}
