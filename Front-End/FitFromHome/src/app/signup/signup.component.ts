import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../services/http.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	fname : string;
	lname : string;
	email : string;
	password : string;
	passwordConfirm : string;
	isTrainer: boolean = false;

	statusDisplay: any;  // Bool for activating status message
	statusAnimation: any;  // String for activating animation of status message
	statusText: any;  // Text inside of status message

	userClass : string = "selected";
	coachClass : string = "";

	constructor(private httpService: HTTPService, private router: Router) { }

	ngOnInit(): void {
	}

	async onSubmit(signupForm) {
		this.email = signupForm.value.email;
		this.password = signupForm.value.password;
		this.fname = signupForm.value.fname;
		this.lname = signupForm.value.lname;
		let fullName = this.fname + " " + this.lname;
		if (this.validateName(this.fname, this.lname) == false){
			this.activateStatusMessage();
		}
		else if (this.validateEmail(this.email) == false){
			
			this.activateStatusMessage();
		}
		else if (this.validatePassword(this.password) == false){
			this.activateStatusMessage();
		}
		else {
			// SIGN UP HERE !!!!!
			console.log('req sent ')
			console.log(this.isTrainer);
			this.httpService.signup(this.email, this.password, this.isTrainer, fullName);
			
			// .subscribe(resData => {
			// 	console.log(resData)
			// 	this.router.navigateByUrl('/');
			// });
		}
	}

	// Validates the name
	validateName(fname, lname){
		if (!fname || !lname){
			this.statusText = 'Please enter your name';
			return false;
		}
		else {
			return true;
		}
	}

	// Validates the email
	validateEmail(email) {
		if (!email){
			this.statusText = 'Please enter a valid email';
			return false;
		}
		else if (email.includes("@") && email.includes(".") && email.length < 9) {
			this.statusText = 'Please enter a valid email';
			return false;
		}
		else {
			return true;
		}
	}

	// Validates the password
	validatePassword(password){
		if (!password){
			this.statusText = "Please enter your password"
			return false;
		}
		else if (password.length < 8) {
			this.statusText = "Password must be at least 8 character long"
			return false;
		}
		else if (password != this.passwordConfirm){
			this.statusText = "Passwords do not match"
			return false;
		}
		else {
			return true;
		}
	}

	// Activates the error pop up bubble
	activateStatusMessage() {
		this.statusDisplay = true;
		this.statusAnimation = "auto";
		setTimeout(() => {
			this.statusAnimation = "";
		}, 100);
	}

	setIsTrainer() {
		this.coachClass = 'selected';
		this.userClass = '';
		this.isTrainer = true;
	}

	setIsClient() {
		this.coachClass = '';
		this.userClass = 'selected';
		this.isTrainer = false;
	}

}
