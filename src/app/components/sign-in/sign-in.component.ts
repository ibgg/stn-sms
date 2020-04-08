import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
	loginFormGroup: FormGroup;
	constructor(public authService: AuthService, 
		private formBuilder: FormBuilder,
		public router: Router,
		public ngZone: NgZone) {
		if (this.authService.userData != null && this.authService.userData.emailVerified){
			this.ngZone.run(() => {
				this.router.navigate(['dashboard']);
			});
		}
	}

	ngOnInit(): void {
		this.initializeLoginForm();
	}

	initializeLoginForm(): any {
		this.loginFormGroup = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

}
