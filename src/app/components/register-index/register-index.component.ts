import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
	selector: 'app-register-index',
	templateUrl: './register-index.component.html',
	styleUrls: ['./register-index.component.css']
})
export class RegisterIndexComponent implements OnInit {
	username: string;
	userpic: string;
	useremail: string;

	constructor(public authService: AuthService) { }

	ngOnInit(): void {
	}
}
