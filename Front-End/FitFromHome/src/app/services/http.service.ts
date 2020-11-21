import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, single, tap } from 'rxjs/operators';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Class } from '../explore/class.model';
import { Subject } from 'rxjs';


interface ClassData {
	classId: string;
    title: string;
    createdBy: string;
    description: string;
    category: string;
    price: string;
    startDate: any;
    endDate: any;
}

@Injectable({
	providedIn: 'root'
})
export class HTTPService {
	private classes: Class[] = [];
	private classesUpdated = new Subject<Class[]>();

	constructor(private http: HttpClient) { }

	url = "http://localhost:8080/api/";

	// Sign up as new user
	postNewUser(email, password) {
		let data = {
			email: email,
			password: password
		}

		return true;
		// return this.http.post("localhost:8080/api/user", data).toPromise();
	}

	// Login User
	loginUser(email, password) {
		let data = {
			email: email,
			password: password
		}

		return true;
		// return this.http.get("localhost:8080/api/user", data).toPromise();
	}

	// 
	getAllClasses(){
		this.classes = [];
		return this.http.get<{fetchedClasses}>(this.url + "classes").pipe(map(classData =>{
			classData.fetchedClasses.map(singleClass => {
				this.classes.push({
					classId: singleClass.id,
					title: singleClass.title,
					createdBy: singleClass.createdBy,
					description: singleClass.description,
					category: singleClass.category,
					price: singleClass.price,
					startDate: singleClass.startDate,
					endDate: singleClass.endDate
				});
			});
			return this.classes;
		})
		)
	}
}
