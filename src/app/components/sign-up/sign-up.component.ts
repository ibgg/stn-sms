import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
	signUpFormGroup: FormGroup;
	
	constructor(public authService: AuthService, private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.initializeSignUpForm();
	}

	initializeSignUpForm(): any{
		this.signUpFormGroup = this.formBuilder.group({
			name: ['', Validators.required],
			lastname: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
			passConfirm: ['', [Validators.required, this.passwordMatchValidator('password')]]
		});
	}

	passwordMatchValidator(matchTo: string): ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} | null => {
			return control.parent &&
			control.parent.value && control.value !== control.parent.controls[matchTo].value ? {'match': false} : null;
		  };
	}

	forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} | null => {
		  const forbidden = nameRe.test(control.value);
		  return forbidden ? {'forbiddenName': {value: control.value}} : null;
		};
	  }
}