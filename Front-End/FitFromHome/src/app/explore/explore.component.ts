import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  searchWord: string;

  constructor() { }

  ngOnInit(): void {
    // fetch & store classes + coach profiles
  }

  get FilterKey() {
    return this.searchWord;
  }
  
}
