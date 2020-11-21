import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HTTPService } from '../services/http.service';
import { Class } from './class.model';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  searchWord: string;
  classesSelected = true;

  classesButtonClass : any;
  coachesButtonClass : any;

  constructor() { }

  ngOnInit(): void {
    this.classesButtonClass = "selected";
    // fetch & store classes + coach profiles
  }

  toggleClasses() {
    this.classesButtonClass = "selected"
    this.coachesButtonClass = ""
    this.classesSelected = true;
  }

  toggleCoaches(){
    this.classesButtonClass = ""
    this.coachesButtonClass = "selected"
    this.classesSelected = false;
  }

  get FilterKey() {
    return this.searchWord;
  }
  
}
