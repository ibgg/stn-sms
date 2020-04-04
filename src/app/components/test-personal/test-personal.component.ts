import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { PersonalTestService } from 'src/app/shared/services/db/personal-test.service';

@Component({
	selector: 'app-test-personal',
	templateUrl: './test-personal.component.html',
	styleUrls: ['./test-personal.component.css']
})
export class TestPersonalComponent implements OnInit {
	@Input() mobileQuery: MediaQueryList;
	@Input() private userId: string;

	serviceListener: any;

	testPersonalFG: FormGroup[] = new Array(6);
	conversionFG: FormGroup;
	convicionsFG: FormGroup;
	courtshipAndMarriageFG: FormGroup;
	spiritualGrowthFG: FormGroup;
	calledFG: FormGroup;
	healthFG: FormGroup;
	saveAttempt: Boolean = false;

	constructor(private formBuilder: FormBuilder, private personalTestService:PersonalTestService) { }

	ngOnInit(): void {
		this.personalTestService.setUserId(this.userId);
		this.initializeForms();
	}

	initializeForms(): any {
		//this.conversionFG = this.formBuilder.group({
		this.testPersonalFG[0] = this.formBuilder.group({
			christEncounterDescription:['', Validators.required],
			christBeforeDescription:['', Validators.required],
			christAfterDescription:['', Validators.required],
			baptismDescription:['', Validators.required]
		});

		//this.convicionsFG = this.formBuilder.group({
		this.testPersonalFG[1] = this.formBuilder.group({
			moralConvictionsDescription: ['', Validators.required],
			moralInvolvementDescription:['', Validators.required],
			alcoholDrugsDescription:['', Validators.required]
		});

		//this.courtshipAndMarriageFG = this.formBuilder.group({
		this.testPersonalFG[2] = this.formBuilder.group({	
			courtshipThought: ['', Validators.required],
			marriageThought:['', Validators.required]
		});
		
		//this.spiritualGrowthFG = this.formBuilder.group({
		this.testPersonalFG[3] = this.formBuilder.group({	
			godsRelationshipDescription: ['', Validators.required],
			authorityThought: ['', Validators.required]
		});

		//this.calledFG = this.formBuilder.group({
		this.testPersonalFG[4] = this.formBuilder.group({	
			calledDescription:['', Validators.required],
			personalMinisterialGoals: ['', Validators.required],
			personalGospelUnderstanding: ['', Validators.required]
		});

		//this.healthFG= this.formBuilder.group({
		this.testPersonalFG[5]= this.formBuilder.group({
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

		this.serviceListener = this.personalTestService.listenPersonalTestInformation(0);
		this.updatePersonalTestInformation({selectedIndex:0});
	}

	private updatePersonalTestInformation(event: any): void {
		this.serviceListener = this.personalTestService.listenPersonalTestInformation(event.selectedIndex);

		this.serviceListener.subscribe(ad => {
			if (ad != undefined && ad != null) {
				this.testPersonalFG[event.selectedIndex].patchValue(ad);
				for (let key in ad) {
					if (ad[key] != null && ad[key] != null && (ad[key].constructor.name == "Timestamp" || ad[key].constructor.name == 't')) {
						ad[key].seconds += 100;
						this.testPersonalFG[event.selectedIndex].get(key).setValue(ad[key].toDate());
					}
				}
			}
		});
	}

	savePersonalTestInfo(formId: number, keyControl: string): void {
		if (this.testPersonalFG[formId].get(keyControl).errors != null) {
			console.debug("Impossible save data for this control...", this.testPersonalFG[formId].get(keyControl).errors);
			return;
		}

		const fieldValue = this.testPersonalFG[formId].get(keyControl).value;
		let data = {};
		data[keyControl] = fieldValue;
		this.personalTestService.updatePersonalTestInformation(formId, data);
	}

	private saveData() {
		this.saveAttempt = true;
	}
}
