import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Class } from '../explore/class.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment'
import { User } from './user.model';
import { Router } from '@angular/router';
import { expressionType } from '@angular/compiler/src/output/output_ast';
import { id } from 'date-fns/locale';
import { Profile } from '../profile/profile.model';


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
	private profiles: Profile[] = [];

	private _user = new BehaviorSubject<User>(null);
	url = "http://localhost:8080/api/";

	private isAuthenticated = false;
	private isTrainer = false;
	private token: string;
	private tokenTimer: any;
	private trainerStatusListener = new Subject<boolean>();
	private authStatusListener = new Subject<boolean>();

	fetchedUser = {};

	constructor(private http: HttpClient, private router: Router) { }

	getIsAuth() {
		return this.isAuthenticated;
	}

	getToken() {
		return this.token;
	}

	getAuthStatusListener() {
		return this.authStatusListener.asObservable();
	}

	getIsTrainer() {
		return this.isTrainer;
	}

	getTrainerStatusListener() {
		return this.trainerStatusListener.asObservable();
	}

	// Sign up as new user
	signup(email: string, password: string, isTrainer: boolean, name: string) {
		return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`, 
		{email: email, password: password, returnSecureToken: true}
		).subscribe(response => {
			let backendId = response.localId;
			this.createUser(backendId, name, isTrainer, email);
			const token = response.idToken
			this.token = token;
			this.login(email, password);
		});
	}

	createUser(id : string, name: string, isTrainer: boolean, email: string ) {
		this.http.post(this.url + "users", {id: id, name: name, isTrainer: isTrainer, email: email }).subscribe(response => {
		});
	}

	logout() {
		this.token = null;
		this.isAuthenticated = false;
		this.authStatusListener.next(false);
		this.trainerStatusListener.next(false);
		clearTimeout(this.tokenTimer);
		this.clearAuthData();
		this.router.navigate(['/login']);
	  }

	getUser(id: string) {
		return this.http.get<{user}>(this.url + `users/${id}`)
		
	}

	// Login User
	login(email, password) {
		this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
		{email: email, password: password, returnSecureToken: true}
		).subscribe(response => {
			const token = response.idToken
			this.token = token;

			if (token) {
				let backEndID = response.localId;
				let userIsTrainer: boolean;

				this.getUser(backEndID).subscribe(resp => {
					//console.log(response);
					this.isTrainer = resp.user.isTrainer;
					if (this.isTrainer) {
						this.trainerStatusListener.next(true);
					}

					const expirationTime = +response.expiresIn;
					this.setAuthTimer(expirationTime);
					this.isAuthenticated = true;
					this.authStatusListener.next(true);
					const now = new Date();
					const expirationDate = new Date(now.getTime() + expirationTime * 1000);
					this.saveAuthData(response.localId, response.idToken, expirationDate, response.email, this.isTrainer);
					this.router.navigate(['/']);
					
				});

				


				// const expirationTime = +response.expiresIn;
				// this.setAuthTimer(expirationTime);
				// this.isAuthenticated = true;
				// this.authStatusListener.next(true);
				// const now = new Date();
				// const expirationDate = new Date(now.getTime() + expirationTime * 1000);
				// this.saveAuthData(response.localId, response.idToken, expirationDate, response.email);
				// this.router.navigate(['/']);
			}
		});
	}

	// saves the currently logged in user info into local storage to keep user logged in upon page refresh
  	private saveAuthData(id: string, token: string, expirationTimer: Date, email: string, isTrainer: boolean) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
	localStorage.setItem('expiration', expirationTimer.toISOString());
	localStorage.setItem('email', email);
	localStorage.setItem('isTrainer', `${isTrainer}`);
  }

	// sets the timer to automatically log out a user
	private setAuthTimer(duration: number) {
		console.log('Setting timer: ' + duration)
		this.tokenTimer = setTimeout(() => {
		  this.logout();
		}, duration * 1000);
	  }

	// clears user data from local storage
	private clearAuthData() {
		localStorage.removeItem('id');
		localStorage.removeItem('token');
		localStorage.removeItem('expiration');
		localStorage.removeItem('email');
		localStorage.removeItem('isTrainer');
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
		  if (authInformation.isTrainer) {
			  this.trainerStatusListener.next(true);
		  }
		  this.isAuthenticated = true;
		  this.setAuthTimer(expiresIn / 1000);
		  this.authStatusListener.next(true);
		}
	   }

	  // returns the information about the logged in user form local storage
	private getAuthData() {
		const token = localStorage.getItem('token');
		const expirationDate = localStorage.getItem('expiration');
		const trainerStat = localStorage.getItem('isTrainer');
		console.log(trainerStat);
		if (!token && !expirationDate) { return; }
		return {	
		  token: token,
		  expirationDate: new Date(expirationDate),
		  isTrainer: trainerStat
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

	deleteClass(id: string) {
		this.http.delete(this.url + `classes/${id}`).subscribe(() => {
			// filter out deleted class from classes array on front end
			this.classes = this.classes.filter(cls => cls.classId !== id);
			this.router.navigate(['/explore']);
		})
	}

	addNewClass(title, createdBy, description, category, price, startDate, endDate, creatorId) {
		return this.http.post<{classID}>(this.url + 'classes', {
			title: title,
			createdBy: createdBy,
			description: description, 
			category: category,
			price: price,
			startDate: startDate,
			endDate: endDate,
			creatorId: creatorId
		});
	}

	getClassesForUser(userId: string){
		return this.http.get(this.url + `classes/forUser/${userId}`);
	}

	AddClassToUser(userId:string, classId:string){
		return this.http.put(this.url + 'users/addClass', {
			userId: userId,
			classId: classId
		},  {responseType: 'text'});
	}

	getClassesCreatedByCoach(coachId) {
		return this.http.get(this.url + `classes/forCoach/${coachId}`).toPromise();
	}

}
