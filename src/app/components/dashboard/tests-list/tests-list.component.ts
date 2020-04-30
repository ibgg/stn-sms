import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-tests-list',
	templateUrl: './tests-list.component.html',
	styleUrls: ['./tests-list.component.css']
})
export class TestsListComponent implements OnInit {
	iconTitle:string="<mat-icon>notes</mat-icon>";
	@Output() navigationEmitter = new EventEmitter<string>();

	constructor(public authService: AuthService) { }

	ngOnInit(): void {
	}

	emmitNavigationClick(componentName: string){
		this.navigationEmitter.emit(componentName);
	}
}
