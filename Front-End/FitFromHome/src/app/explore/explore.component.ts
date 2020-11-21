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

  constructor() { }

  ngOnInit(){

  }

  toggleCategory() {
    this.classesSelected = !this.classesSelected;
  }

  get FilterKey() {
    return this.searchWord;
  }
  
}
