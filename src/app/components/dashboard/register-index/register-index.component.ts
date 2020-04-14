import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-register-index',
	templateUrl: './register-index.component.html',
	styleUrls: ['./register-index.component.css']
})
export class RegisterIndexComponent implements OnInit {
	iconTitle:string="<mat-icon>notes</mat-icon>";
	@Output() navigationEmitter = new EventEmitter<string>();

	constructor(public authService: AuthService) { }

	ngOnInit(): void {
	}

	emmitNavigationClick(componentName: string){
		this.navigationEmitter.emit(componentName);
	}
}
