import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Class } from '../explore/class.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment'
import { User } from './user.model';
import { Router } from '@angular/router';


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
export class HTTPService{
	private classes: Class[] = [];
	private _user = new BehaviorSubject<User>(null);
	private activeLogoutTimer: any;
	//private classesUpdated = new Subject<Class[]>();

	private isAuthenticated = false;
	private token: string;
	private tokenTimer: any;
	private authStatusListener = new Subject<boolean>();

	constructor(private http: HttpClient, private router: Router) { }

	get userIsAuthenticated () {
		// double ! forces conversion to a boolean
		return this._user.pipe(map(user => {
		  if (user) {
			return !!user.token;
		  } else {
			return false;
		  }
		}));
	  }

	  get userId() {
		return this._user.asObservable().pipe(map(user => {
		  if (user) {
			return user.id;
		  } else {
			return null;
		  }
		}));
	  }

	  get userToken() {
		return this._user.asObservable().pipe(map(user => {
		  if (user) {
			return user.token;
		  } else {
			return null;
		  }
		}));
	  }

	url = "http://localhost:8080/api/";

	// Sign up as new user
	signup(email: string, password: string) {
		return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`, 
		{email: email, password: password, returnSecureToken: true}
		).subscribe(response => {
			this.token = response.idToken;
			if (this.token) {

				const expirationTime = new Date (new Date().getTime() + (+response.expiresIn * 1000));
				const user = new User(response.localId, response.email, response.idToken, expirationTime)
				this._user.next(user);
				console.log(expirationTime);
				this.isAuthenticated = true;
				this.saveAuthData(response.localId, response.idToken, expirationTime, response.email);
				this.router.navigate(['/']);
			}
		});
	}


	logout() {
		this.token = null;
		this.isAuthenticated = false;
		this.authStatusListener.next(false);
		clearTimeout(this.tokenTimer);
		this.clearAuthData();
		this.router.navigate(['/landing']);
	  }

	// Login User
	login(email, password) {
		return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
		{email: email, password: password, returnSecureToken: true}
		).subscribe(response => {
			this.token = response.idToken;
			if (this.token) {
				
				const expirationTime = new Date (new Date().getTime() + 10);
				console.log('wcwc' + expirationTime);
				
				//new Date (new Date().getTime() + (+response.expiresIn * 1000));
				const user = new User(response.localId, response.email, response.idToken, expirationTime)
				this._user.next(user);
				this.isAuthenticated = true;		
				this.saveAuthData(response.localId, response.idToken, expirationTime, response.email);
				this.router.navigate(['/']);
			}
		});
	}

	// saves the currently logged in user info into local storage to keep user logged in upon page refresh
  	private saveAuthData(id: string, token: string, expirationTimer: Date, email: string) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
	localStorage.setItem('expiration', expirationTimer.toISOString());
	localStorage.setItem('email', email);
  }

	// sets the timer to automatically log out a user
	private setAuthTimer(duration: number) {
		console.log('Setting timer: ' + duration)
		this.tokenTimer = setTimeout(() => {
		  this.logout();
		}, duration * 1);
	  }

	// clears user data from local storage
	private clearAuthData() {
		localStorage.removeItem('id');
		localStorage.removeItem('token');
		localStorage.removeItem('expiration');
		localStorage.removeItem('email');
	}

	// automatically authenticate logged in user if page is refreshed
	autoAuthUser() {
		const authInformation = this.getAuthData();
		if (!authInformation) { return; }
		const now = new Date();
		const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
		console.log(expiresIn)
		if (expiresIn > 0) {
		  this.token = authInformation.token;
		  this.isAuthenticated = true;
		  this.setAuthTimer(expiresIn / 1000);
		  this.authStatusListener.next(true);
		}
	   }

	  // returns the information about the logged in user form local storage
	  private getAuthData() {
		const token = localStorage.getItem('token');
		const expirationDate = localStorage.getItem('expiration');
		if (!token && !expirationDate) { return; }
		return {
		  token: token,
		  expirationDate: new Date(expirationDate)
		};
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
