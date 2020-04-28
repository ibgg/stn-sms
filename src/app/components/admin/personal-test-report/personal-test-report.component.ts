import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PersonalTestService } from 'src/app/shared/services/db/personal-test.service';

@Component({
	selector: 'app-personal-test-report',
	templateUrl: './personal-test-report.component.html',
	styleUrls: ['./personal-test-report.component.css'],
	providers: [DatePipe]
})
export class PersonalTestReportComponent implements OnInit {
	private mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	private userId: string;
	private testPersonalFG: FormGroup[] = new Array(6);
	private filledOneTest:boolean = false;
	private selectedIndex:number = 0;
	private completeness:number = 0;

	constructor(
		private formBuilder: FormBuilder,
		private personalTestService: PersonalTestService,
		changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
		private route: ActivatedRoute,
		private datePipe: DatePipe
	) { }

	ngOnInit(): void {
		this.userId = this.route.snapshot.params.student;
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
				this.testPersonalFG[i].disable();
				if (this.testPersonalFG[i].invalid && !this.testPersonalFG[0].invalid && this.selectedIndex < 1){
					this.selectedIndex = i;
				}
			});	
		}
	}
}
