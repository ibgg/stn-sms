import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
	loginFormGroup: FormGroup;
  constructor(public authService : AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
	  this.initializeLoginForm();
  }

  initializeLoginForm():any {
	  this.loginFormGroup = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required]
	  });
  }
}
