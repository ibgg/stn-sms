import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
	mobileQuery: MediaQueryList;
	private currentComponent: string = "tests-list";
	private _mobileQueryListener: () => void;

	constructor(
		public authService: AuthService,
		public router: Router,
		public ngZone: NgZone,
		changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
	) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnInit(): void {
		
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
	logout(): void {
		this.authService.signOut();
	}

	public showComponent(componentName: string, snav: MatSidenav, fromChild:boolean){
		this.currentComponent = componentName;
		if (this.mobileQuery.matches && snav && snav.opened) snav.toggle();
	}

	isOpened(value:string){

	}
}
