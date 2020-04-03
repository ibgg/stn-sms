import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, ValidationErrors, Form } from '@angular/forms';
import { EnrollmentServiceService } from 'src/app/shared/services/db/enrollment-service.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	@Input() mobileQuery: MediaQueryList;
	@Input() private userId: string;

	ad: any;

	enrollmentInfoFormGroup:FormGroup[] = new Array(5);

	@ViewChild('personalInformationForm')
	personalInformationForm: FormGroupDirective;


	tickInterval = 5;

	constructor(private formBuilder: FormBuilder, private enrollmentService: EnrollmentServiceService) { }

	ngOnInit(): void {
		this.initializeForms();
	}

	async initializeForms() {
		this.enrollmentService.setUserId(this.userId);

		this.enrollmentInfoFormGroup[0] = this.formBuilder.group({
			name: ['', Validators.required],
			lastname: ['', Validators.required],
			bornDate: [new Date("April 22, 2020 at 12:00:00 AM UTC-6"), Validators.required],
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
			tutorAcademicDegree: ['', Validators.required],
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
		this.ad = this.enrollmentService.listenEnrollmentInformation(0);
		this.updateEnrollmentInfo({selectedIndex:0});
	}

	validatePersonalInformationForm(): any {
		this.personalInformationForm.onSubmit(undefined);
	}

	// Listen for incomming changes in db
	updateEnrollmentInfo(event: any): void {
		this.ad = this.enrollmentService.listenEnrollmentInformation(event.selectedIndex);

		this.ad.subscribe(ad => {
			if (ad != undefined && ad != null) {
				this.enrollmentInfoFormGroup[event.selectedIndex].patchValue(ad);
				for (let key in ad) {
					if (ad[key] != null && ad[key] != null && (ad[key].constructor.name == "Timestamp" || ad[key].constructor.name == 't')) {
						ad[key].seconds += 100;
						this.enrollmentInfoFormGroup[event.selectedIndex].get(key).setValue(ad[key].toDate());
					}
				}
			}
		});
	}

	// Save data to firestoredb
	saveEnrollmentInfo(formId: number, keyControl: string): void {
		if (this.enrollmentInfoFormGroup[formId].get(keyControl).errors != null) {
			console.debug("Impossible save data for this control...", this.enrollmentInfoFormGroup[formId].get(keyControl).errors);
			return;
		}

		const fieldValue = this.enrollmentInfoFormGroup[formId].get(keyControl).value;
		let data = {};
		data[keyControl] = fieldValue;
		this.enrollmentService.updateEnrollmentInformation(formId, data);
	}

	getFormValidationErrors() {
		Object.keys(this.enrollmentInfoFormGroup[0].controls).forEach(key => {

			const controlErrors: ValidationErrors = this.enrollmentInfoFormGroup[0].get(key).errors;
			if (controlErrors != null) {
				Object.keys(controlErrors).forEach(keyError => {
					console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
				});
			}
		});
	}
}
