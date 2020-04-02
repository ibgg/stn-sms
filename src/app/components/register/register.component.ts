import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { EnrollmentServiceService } from 'src/app/shared/services/db/enrollment-service.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	@Input() mobileQuery: MediaQueryList;
	@Input() private userId: string;

	ad: any;

	personalInformationFormGroup: FormGroup;
	professionalAndAcademicFormGroup: FormGroup;
	christianExperience: FormGroup;
	tutorFormGroup: FormGroup;
	institutionFormGroup: FormGroup;

	@ViewChild('personalInformationForm')
	personalInformationForm: FormGroupDirective;


	tickInterval = 5;

	constructor(private formBuilder: FormBuilder, private enrollmentService: EnrollmentServiceService) { }

	ngOnInit(): void {
		this.initializeForms();
	}

	async initializeForms() {
		this.enrollmentService.setUserId(this.userId);

		this.personalInformationFormGroup = this.formBuilder.group({
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

		this.professionalAndAcademicFormGroup = this.formBuilder.group({
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
		this.christianExperience = this.formBuilder.group({
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
			churchMinistres: ['', Validators.required],
		});
		this.tutorFormGroup = this.formBuilder.group({
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
			christianParents: [null, Validators.required],
		});
		this.institutionFormGroup = this.formBuilder.group({
			programTarget: ['', Validators.required],
			seminaryReason: ['', Validators.required],
			seminaryKnow: ['', Validators.required],
			giftsKnown: ['', Validators.required],
			giftsUnknown: ['', Validators.required],
			moneyEntry: ['', Validators.required],
			devotionalLife: ['', Validators.required],
			trustworthyAgreement: ['', Validators.required],
			rulesAgreement: ['', Validators.required],
			paymentAgreement: ['', Validators.required],
		});

		this.listenPersonalInformation();
	}

	validatePersonalInformationForm(): any {
		this.personalInformationForm.onSubmit(undefined);
	}

	listenPersonalInformation(): void {
		this.ad = this.enrollmentService.listenPersonalInformation();

		// Listen enrollment document for changes and update form value
		this.ad.subscribe(ad => {
			if (ad != undefined && ad != null) {
				this.personalInformationFormGroup.patchValue(ad);
				for (let key in ad) {
					if (ad[key] != null && ad[key] != null && ad[key].constructor.name == "Timestamp") {
						this.personalInformationFormGroup.get(key).setValue(ad[key].toDate());
					}
				}
			}
		});
	}

	getFormValidationErrors() {
		Object.keys(this.personalInformationFormGroup.controls).forEach(key => {

			const controlErrors: ValidationErrors = this.personalInformationFormGroup.get(key).errors;
			if (controlErrors != null) {
				Object.keys(controlErrors).forEach(keyError => {
					console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
				});
			}
		});
	}

	savePersonalInformation(keyControl: string): void {
		console.debug("Trying save form data %s...", keyControl);

		if (this.personalInformationFormGroup.get(keyControl).errors != null) {
			console.debug("Impossible save data for this control...", this.personalInformationFormGroup.get(keyControl).errors);
			return;
		}

		const fieldValue = this.personalInformationFormGroup.get(keyControl).value;
		let data = {};
		data[keyControl] = fieldValue;
		console.log(data);
		this.enrollmentService.updatePersonalInformation(data);
	}
}
