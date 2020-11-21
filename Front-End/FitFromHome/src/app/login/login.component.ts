import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	email: string;
	password: string;

	statusDisplay: any;  // Bool for activating status message
	statusAnimation: any;  // String for activating animation of status message
	statusText: any;  // Text inside of status message

	constructor() { }

	ngOnInit(): void {
	}

	async onSubmit(loginForm) {
		let email = loginForm.value.email;
		let password = loginForm.value.password;

		if (this.validateEmail(email) == false) {
			this.activateStatusMessage();
		}
		else if (this.validatePassword(password) == false){
			this.activateStatusMessage();
		}
		else{
			// LOGIN HERE!!!!!!
			alert('login');
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
			return true;
		}
		else {
			return false;
		}
	}

	// Validates the password
	validatePassword(password){
		if (!password){
			this.statusText = "Please enter your password"
			return false;
		}
		else if (password.length < 8) {
			this.statusText = "Incorrect password"
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
}
