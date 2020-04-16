import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface PeriodicElement {
	name: string;
	email: number;
	weight: number;
	symbol: string;
	description: string;
}

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	]
})
export class AdminComponent implements OnInit {
	constructor(public authService: AuthService) {

	}

	ngOnInit(): void {
	}

}
