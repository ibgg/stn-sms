import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Component({
	selector: 'app-test-personal',
	templateUrl: './test-personal.component.html',
	styleUrls: ['./test-personal.component.css']
})
export class TestPersonalComponent implements OnInit {
	@Input() mobileQuery: MediaQueryList;
	conversionFG: FormGroup;
	convicionsFG: FormGroup;
	courtshipAndMarriageFG: FormGroup;
	spiritualGrowthFG: FormGroup;
	calledFG: FormGroup;
	healthFG: FormGroup;
	saveAttempt: Boolean = false;

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.initializeForms();
	}

	initializeForms(): any {
		this.conversionFG = this.formBuilder.group({
			christEncounterDescription:['', Validators.required],
			christBeforeDescription:['', Validators.required],
			christAfterDescription:['', Validators.required],
			baptismDescription:['', Validators.required]
		});

		this.convicionsFG = this.formBuilder.group({
			moralConvictionsDescription: ['', Validators.required],
			moralInvolvementDescription:['', Validators.required],
			alcoholDrugsDescription:['', Validators.required]
		});

		this.courtshipAndMarriageFG = this.formBuilder.group({
			courtshipThought: ['', Validators.required],
			marriageThought:['', Validators.required]
		});
		
		this.spiritualGrowthFG = this.formBuilder.group({
			godsRelationshipDescription: ['', Validators.required],
			authorityThought: ['', Validators.required]
		});

		this.calledFG = this.formBuilder.group({
			calledDescription:['', Validators.required],
			personalMinisterialGoals: ['', Validators.required],
			personalGospelUnderstanding: ['', Validators.required]
		});

		this.healthFG= this.formBuilder.group({
			healthCondition: ['', Validators.required],
			drugAllergy:['', Validators.required],
			chronicIllness: ['', Validators.required],
			controlledDrug: ['', Validators.required],
			visualProblems: ['', Validators.required],
			speakingIllness: ['', Validators.required],
			vaccinesCompletition: ['', Validators.required],
			contagiousIllness: ['', Validators.required],
			sexualTransmisionIllness: ['', Validators.required],
			agrementCheck: [false, [Validators.requiredTrue]]
		});
	}

	private saveData() {
		this.saveAttempt = true;
	}
}
