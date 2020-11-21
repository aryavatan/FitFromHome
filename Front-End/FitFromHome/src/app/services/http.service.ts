import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Class } from '../explore/class.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment'


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

interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	localId: string;
	expiresIn: string;
	registered?: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class HTTPService {
	private classes: Class[] = [];
	//private classesUpdated = new Subject<Class[]>();

	constructor(private http: HttpClient) { }

	url = "http://localhost:8080/api/";

	// Sign up as new user
	postNewUser(email: string, password: string) {

		// return this.http.post(this.url + "signup", {email: email, password: password})
		return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`, 
		{email: email, password: password, returnSecureToken: true}
		)
	}

	// Login User
	loginUser(email, password) {
		let data = {
			email: email,
			password: password
		}

		return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
		{email: email, password: password, returnSecureToken: true}
		)
		
		
	}

	
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

	getClass(id: string) {
		return this.http.get<{fetchedClass}>(this.url + `classes/${id}`);
	}

}
