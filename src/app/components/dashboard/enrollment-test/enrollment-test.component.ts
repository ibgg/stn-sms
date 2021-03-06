import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, ValidationErrors, Form, AbstractControl } from '@angular/forms';
import { EnrollmentServiceService } from 'src/app/shared/services/db/enrollment-service.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
	selector: 'app-enrollment-test',
	templateUrl: './enrollment-test.component.html',
	styleUrls: ['./enrollment-test.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{
		provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false, showError: true}
	  }]
})
export class EnrollmentTestComponent implements OnInit, AfterViewInit {
	private errorMessage:string = "Formulario incompleto";
	private mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	private userId: string;
	private enrollmentInfoFormGroup:FormGroup[] = new Array(5);
	private filledOneTest:boolean = false;
	private selectedIndex:number = 0;
	private completeness:number = 0;

	@ViewChild('enrollmentInfoForm0')
	private enrollmentInfoForm0: FormGroupDirective;
	@ViewChild('enrollmentInfoForm1')
	private enrollmentInfoForm1: FormGroupDirective;
	@ViewChild('enrollmentInfoForm2')
	private enrollmentInfoForm2: FormGroupDirective;
	@ViewChild('enrollmentInfoForm3')
	private enrollmentInfoForm3: FormGroupDirective;
	@ViewChild('enrollmentInfoForm4')
	private enrollmentInfoForm4: FormGroupDirective;

	constructor(private formBuilder: FormBuilder, 
		private enrollmentService: EnrollmentServiceService, 
		public authService: AuthService,
		changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
		) { 
			this.mobileQuery = media.matchMedia('(max-width: 600px)');
			this._mobileQueryListener = () => changeDetectorRef.detectChanges();
			this.mobileQuery.addListener(this._mobileQueryListener);	
		}

	ngOnInit(): void {
		console.log("---ngOnInit()---");
		this.userId = this.authService.userData.uid;
		this.initializeForms();
	}

	ngAfterViewInit() {
		console.log("---ngAfterViewInit()---");
		this.fillForms();
		this.evaluateCurrentForm({selectedIndex:0});
		this.listenFormStatus();
	}

	private async initializeForms() {
		this.enrollmentService.setUserId(this.userId);

		this.enrollmentInfoFormGroup[0] = this.formBuilder.group({
			name: ['', Validators.required],
			lastname: ['', Validators.required],
			bornDate: ['', Validators.required],
			gender: ['', Validators.required],
			curp: ['', Validators.required],
			maritalStatus: ['', Validators.required],
			nationality: ['', Validators.required],
			address: ['', Validators.required],
			city: ['', Validators.required],
			state: ['', Validators.required],
			zipCode: ['', Validators.required],
			phone: ['', Validators.required],
			cellphone: ['', Validators.required],
			disability: [false, Validators.required],
			disabilityDescription: ['']
		});

		this.enrollmentInfoFormGroup[1] = this.formBuilder.group({
			highschoolName: ['', Validators.required],
			highschoolStartYear: ['', Validators.required],
			highschoolEndYear: ['', Validators.required],
			academicDegree: ['', Validators.required],
			academicDegreeStartYear: ['', Validators.required],
			academicDegreeEndYear: ['', Validators.required],
			theologicalStudy: [false],
			theologicalInstitutionName: [''],
			theologicalDegree: [''],
			certifications: [''],
			occupation: ['', Validators.required],
			workHistory: ['', Validators.required],
			abilities: ['', Validators.required],
			englishLevel: ['', Validators.required]
		});

		this.enrollmentInfoFormGroup[2] = this.formBuilder.group({
			newbirthDate: ['', Validators.required],
			baptismDate: ['', Validators.required],
			churchName: ['', Validators.required],
			denomination: ['', Validators.required],
			pastorName: ['', Validators.required],
			churchAddress: ['', Validators.required],
			churchPhone: ['', Validators.required],
			churchCity: ['', Validators.required],
			churchState: ['', Validators.required],
			churchZipCode: ['', Validators.required],
			churchLifeDescription: ['', Validators.required],
			churchMinistres: ['', Validators.required]
		});

		this.enrollmentInfoFormGroup[3] = this.formBuilder.group({
			name: ['', Validators.required],
			lastname: ['', Validators.required],
			academicDegree: ['', Validators.required],
			occupation: ['', Validators.required],
			address: ['', Validators.required],
			phone: ['', Validators.required],
			city: ['', Validators.required],
			state: ['', Validators.required],
			zipCode: ['', Validators.required],
			christianParents: [null, Validators.required]
		});

		this.enrollmentInfoFormGroup[4] = this.formBuilder.group({
			programTarget: ['', Validators.required],
			seminaryReason: ['', Validators.required],
			seminaryKnow: ['', Validators.required],
			giftsKnown: ['', Validators.required],
			giftsUnknown: ['', Validators.required],
			moneyEntry: ['', Validators.required],
			devotionalLife: ['', Validators.required],
			trustworthyAgreement: ['', Validators.required],
			rulesAgreement: ['', Validators.required],
			paymentAgreement: ['', Validators.required]
		});
		//this.ad = this.enrollmentService.listenEnrollmentInformation(0);
	}
	
	// Get data for validation errors
	private fillForms():void {
		for (let i = 0; i < this.enrollmentInfoFormGroup.length; i++){
			this.enrollmentService.getEnrollmentInformation(i).then(snap => {
				if (snap.data() != undefined && snap.data() != null){
					this.enrollmentInfoFormGroup[i].patchValue(snap.data());	
					for (let key in snap.data()) {
						if (snap.data()[key] != null && snap.data()[key] != null && (snap.data()[key].constructor.name == "Timestamp" || snap.data()[key].constructor.name == 't')) {
							snap.data()[key].seconds += 100;
							this.enrollmentInfoFormGroup[i].get(key).setValue(snap.data()[key].toDate());
						}
					}
					this.enrollmentInfoFormGroup[i].markAsDirty();
					this.filledOneTest = true;
				}
				if (this.enrollmentInfoFormGroup[i].invalid && !this.enrollmentInfoFormGroup[0].invalid && this.selectedIndex < 1){
					this.selectedIndex = i;
				}
			});	
		}
	}

	// Listen for incomming changes in db
	private evaluateCurrentForm(event: any): void {
		if (this.enrollmentInfoFormGroup[event.selectedIndex].dirty){
			let evaluate = "this.enrollmentInfoForm"+event.selectedIndex+".onSubmit('undefined')";
			eval(evaluate);
		}
	}

	// Save data to firestoredb
	private saveEnrollmentInfo(formId: number, keyControl: string): void {
		if (this.enrollmentInfoFormGroup[formId].get(keyControl).errors != null) {
			console.debug("Impossible save data for this control...", this.enrollmentInfoFormGroup[formId].get(keyControl).errors);
			return;
		}

		const fieldValue = this.enrollmentInfoFormGroup[formId].get(keyControl).value;
		let data = {};
		data[keyControl] = fieldValue;
		this.enrollmentService.updateEnrollmentInformation(formId, data);
	}

	private getFormValidationErrors(i:number) {
		console.log("VALIDATIONS FOR: ", i);
		Object.keys(this.enrollmentInfoFormGroup[i].controls).forEach(key => {
			const controlErrors: ValidationErrors = this.enrollmentInfoFormGroup[i].get(key).errors;
			if (controlErrors != null) {
				Object.keys(controlErrors).forEach(keyError => {
					console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
				});
			}
		});
	}

	private listenFormStatus():void {
		this.enrollmentInfoFormGroup.forEach((formGroup) => {
			let sub = formGroup.statusChanges.subscribe((status) => {
				if (status == 'VALID') {
					this.completeness += (1 / this.enrollmentInfoFormGroup.length)*100;
					this.authService.setFormCompletude(this.authService.userData.uid, {"enrollmentCompleteness": this.completeness});
					sub.unsubscribe();
				}
			});
		});
	}
}
