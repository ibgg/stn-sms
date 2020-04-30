import { Component, OnInit } from '@angular/core';
import { PsychologicalService } from 'src/app/shared/services/db/psychological.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PsicoQuestions } from '../../dashboard/psychological-test/psico-questions';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-psycho-test-report',
	templateUrl: './psycho-test-report.component.html',
	styleUrls: ['./psycho-test-report.component.css']
})
export class PsychoTestReportComponent implements OnInit {
	private userId: string;
	private psicologicalTestFG: FormGroup;

	private serviceListener: any;

	private started: boolean = false;
	private psicoQuestions: any = PsicoQuestions;
	constructor(private psychoTestService: PsychologicalService, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.userId = this.route.snapshot.params.student;
		this.psychoTestService.setUserId(this.userId);
		let group = {};

		for (let i = 0; i < this.psicoQuestions.length; i++){
			group["question"+i] = new FormControl('', Validators.required);
		}
		console.log(this.psicoQuestions);
		this.psicologicalTestFG = new FormGroup(group);
		this.serviceListener = this.psychoTestService.listenPsychoTestInformation(0);
		this.updatePsychoTestInformation({selectedIndex:0});
	}

	private updatePsychoTestInformation(event: any): void {
		this.serviceListener = this.psychoTestService.listenPsychoTestInformation(event.selectedIndex);

		this.serviceListener.subscribe(ad => {
			if (ad != undefined && ad != null) {
				//this.psicologicalTestFG.patchValue(ad);
				for (let key in ad) {
					if (this.psicologicalTestFG.get(key).value == ad[key]) continue;
					else this.psicologicalTestFG.get(key).setValue(ad[key]);
					if (this.psicologicalTestFG.get(key).value != null && this.psicologicalTestFG.get(key).value != undefined && this.psicologicalTestFG.get(key).value != "") this.psicologicalTestFG.get(key).disable();
				}

				//this.completeness = 
			}
			this.psicologicalTestFG.disable();
		});
	}
}
