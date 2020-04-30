import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form, FormGroupDirective } from '@angular/forms';
import { PersonalTestService } from 'src/app/shared/services/db/personal-test.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
	selector: 'app-personal-test',
	templateUrl: './personal-test.component.html',
	styleUrls: ['./personal-test.component.css'],
	providers: [{
		provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false, showError: true}
	  }]
})
export class PersonalTestComponent implements OnInit {
	private errorMessage:string = "Formulario incompleto";
	private mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	private userId: string;
	private filledOneTest:boolean = false;
	private selectedIndex:number = 0;
	private completeness:number = 0;

	private testPersonalFG: FormGroup[] = new Array(6);

	@ViewChild('personalTestForm0')
	private personalTestForm0: FormGroupDirective;
	@ViewChild('personalTestForm1')
	private personalTestForm1: FormGroupDirective;
	@ViewChild('personalTestForm2')
	private personalTestForm2: FormGroupDirective;
	@ViewChild('personalTestForm3')
	private personalTestForm3: FormGroupDirective;
	@ViewChild('personalTestForm4')
	private personalTestForm4: FormGroupDirective;
	@ViewChild('personalTestForm5')
	private personalTestForm5: FormGroupDirective;


	constructor(private formBuilder: FormBuilder,
		private personalTestService: PersonalTestService,
		public authService: AuthService,
		changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
			this.mobileQuery = media.matchMedia('(max-width: 600px)');
			this._mobileQueryListener = () => changeDetectorRef.detectChanges();
			this.mobileQuery.addListener(this._mobileQueryListener);	

	}

	ngOnInit(): void {
		this.userId = this.authService.userData.uid;
		this.personalTestService.setUserId(this.userId);
		this.initializeForms();
	}

	private initializeForms(): any {
		//this.conversionFG = this.formBuilder.group({
		this.testPersonalFG[0] = this.formBuilder.group({
			christEncounterDescription: ['', Validators.required],
			christBeforeDescription: ['', Validators.required],
			christAfterDescription: ['', Validators.required],
			baptismDescription: ['', Validators.required]
		});

		//this.convicionsFG = this.formBuilder.group({
		this.testPersonalFG[1] = this.formBuilder.group({
			moralConvictionsDescription: ['', Validators.required],
			moralInvolvementDescription: ['', Validators.required],
			alcoholDrugsDescription: ['', Validators.required]
		});

		//this.courtshipAndMarriageFG = this.formBuilder.group({
		this.testPersonalFG[2] = this.formBuilder.group({
			courtshipThought: ['', Validators.required],
			marriageThought: ['', Validators.required]
		});

		//this.spiritualGrowthFG = this.formBuilder.group({
		this.testPersonalFG[3] = this.formBuilder.group({
			godsRelationshipDescription: ['', Validators.required],
			authorityThought: ['', Validators.required]
		});

		//this.calledFG = this.formBuilder.group({
		this.testPersonalFG[4] = this.formBuilder.group({
			calledDescription: ['', Validators.required],
			personalMinisterialGoals: ['', Validators.required],
			personalGospelUnderstanding: ['', Validators.required]
		});

		//this.healthFG= this.formBuilder.group({
		this.testPersonalFG[5] = this.formBuilder.group({
			healthCondition: ['', Validators.required],
			drugAllergy: ['', Validators.required],
			chronicIllness: ['', Validators.required],
			controlledDrug: ['', Validators.required],
			visualProblems: ['', Validators.required],
			speakingIllness: ['', Validators.required],
			vaccinesCompletition: ['', Validators.required],
			contagiousIllness: ['', Validators.required],
			sexualTransmisionIllness: ['', Validators.required],
			agrementCheck: [false, [Validators.requiredTrue]]
		});

		this.fillForms();
		this.evaluateCurrentForm({selectedIndex:0});
		this.listenFormStatus();
	}

	private fillForms():void {
		for (let i = 0; i < this.testPersonalFG.length; i++){
			this.personalTestService.getPersonalTestInformation(i).then(snap => {
				if (snap.data() != undefined && snap.data() != null){
					this.testPersonalFG[i].patchValue(snap.data());	
					for (let key in snap.data()) {
						if (snap.data()[key] != null && snap.data()[key] != null && (snap.data()[key].constructor.name == "Timestamp" || snap.data()[key].constructor.name == 't')) {
							snap.data()[key].seconds += 100;
							this.testPersonalFG[i].get(key).setValue(snap.data()[key].toDate());
						}
					}
					this.testPersonalFG[i].markAsDirty();
					this.filledOneTest = true;
				}
				if (this.testPersonalFG[i].invalid && !this.testPersonalFG[0].invalid && this.selectedIndex < 1){
					this.selectedIndex = i;
				}
			});	
		}
	}

	private evaluateCurrentForm(event: any): void {
		if (this.testPersonalFG[event.selectedIndex].dirty){
			let evaluate = "this.personalTestForm"+event.selectedIndex+".onSubmit('undefined')";
			eval(evaluate);
		}
	}

	private savePersonalTestInfo(formId: number, keyControl: string): void {
		if (this.testPersonalFG[formId].get(keyControl).errors != null) {
			console.debug("Impossible save data for this control...", this.testPersonalFG[formId].get(keyControl).errors);
			return;
		}

		const fieldValue = this.testPersonalFG[formId].get(keyControl).value;
		let data = {};
		data[keyControl] = fieldValue;
		this.personalTestService.updatePersonalTestInformation(formId, data);
	}

	private listenFormStatus():void {
		this.testPersonalFG.forEach((formGroup) => {
			let sub = formGroup.statusChanges.subscribe((status) => {
				if (status == 'VALID') {
					this.completeness += (1 / this.testPersonalFG.length)*100;
					this.authService.setFormCompletude(this.authService.userData.uid, {"personalTestCompleteness": this.completeness});
					sub.unsubscribe();
				}
			});
		});
	}
}
