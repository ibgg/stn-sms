import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements AfterViewInit {
	constructor(public authService: AuthService) {

	}

	ngAfterViewInit(): void {
	}

	logout(): void {
		this.authService.signOut();
	}

}
