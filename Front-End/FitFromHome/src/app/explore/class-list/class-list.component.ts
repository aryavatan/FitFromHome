import { Component, OnInit } from '@angular/core';
import { HTTPService } from 'src/app/services/http.service';
import { Class } from '../class.model';

@Component({
	selector: 'app-class-list',
	templateUrl: './class-list.component.html',
	styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {
	searchWord: string;
	testVar: any;

	// holds all classes in db
	fetchedClasses: Class[] = [];

	// holds all filters for classes
	filters: any[] = [{name:"All", class:"selected"}];

	constructor(private httpService: HTTPService) { }

	ngOnInit() {
		// Get Classes
		this.httpService.getAllClasses().subscribe(classArray => {
			this.fetchedClasses = classArray;

			// Get Filters
			this.fetchedClasses.forEach(session => {
				if (this.filters.filter(e => e.name == session.category).length == 0){
					this.filters.push({
						name: session.category,
						class: ""
					});
				}
			});
		});
	}

	// Update the filter selected and the filtered classes
	filterSelected(filterName){
		this.filters.forEach(filter => {
			if (filter.name == filterName){
				filter.class = "selected";
				
				if (filter.name == "All")
					this.searchWord = "";
				else
					this.searchWord = filter.name;
				
			}
			else {
				filter.class = "";
			}
		});
	}
}