import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-register-index',
	templateUrl: './register-index.component.html',
	styleUrls: ['./register-index.component.css']
})
export class RegisterIndexComponent implements OnInit {
	@Output() navigationEmitter = new EventEmitter<string>();

	username: string;
	userpic: string;
	useremail: string;

	constructor(public authService: AuthService) { }

	ngOnInit(): void {
	}

	emmitNavigationClick(componentName: string){
		this.navigationEmitter.emit(componentName);
	}
}
