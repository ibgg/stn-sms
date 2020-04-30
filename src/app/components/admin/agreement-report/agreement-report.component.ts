import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/db/user.service';

@Component({
  selector: 'app-agreement-report',
  templateUrl: './agreement-report.component.html',
  styleUrls: ['./agreement-report.component.css']
})
export class AgreementReportComponent implements OnInit {
	private userId: string;
	private agreementChecked: boolean = false;
	constructor(
		private userService: UserService,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.userId = this.route.snapshot.params.student;
		this.getUserData();
	}

	private getUserData(){
		this.userService.getUserData(this.userId).then((snap) => {
			if (snap.data()){
				this.agreementChecked = snap.data().agreementCompleteness;
			}
		}).catch((error) => {
			console.error("Error trying get user data", error);
		})
	}
}
