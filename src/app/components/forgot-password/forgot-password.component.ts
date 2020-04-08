import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	recoverPasswordForm: FormGroup;
	constructor(public authService: AuthService, private fb: FormBuilder) { 
		this.authService.error = "";
	}

	ngOnInit(): void {
		this.initializeFormSettings();
	}

	private initializeFormSettings(): any {
		this.recoverPasswordForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]]
		});
	}
}
