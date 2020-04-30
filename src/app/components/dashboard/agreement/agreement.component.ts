import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-agreement',
	templateUrl: './agreement.component.html',
	styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {
	private checked: boolean = false;
	constructor(public authService: AuthService) { }

	ngOnInit(): void {
	}

	// Getting agreement status from database
	private saveAgreementStatus(event:any):void {
		this.authService.setFormCompletude(this.authService.userData.uid, {"agreementCompleteness": event.checked});
	}
}
