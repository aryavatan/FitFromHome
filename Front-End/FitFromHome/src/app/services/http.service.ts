import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class HTTPService {

	constructor(private http: HttpClient) { }

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

	getClass(id: string) {
		// backend call to fetch single place by id here
	}

}
