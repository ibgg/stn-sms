import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
	mobileQuery: MediaQueryList;
	private currentComponent: string = "register";

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

	public showComponent(componentName: string){
		this.currentComponent = componentName;
	}
}