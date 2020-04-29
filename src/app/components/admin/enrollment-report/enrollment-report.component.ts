import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnrollmentServiceService } from 'src/app/shared/services/db/enrollment-service.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-enrollment-report',
	templateUrl: './enrollment-report.component.html',
	styleUrls: ['./enrollment-report.component.css'],
	providers: [ DatePipe ],
	encapsulation: ViewEncapsulation.None,
})
export class EnrollmentReportComponent implements OnInit, AfterViewInit {
	private mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	private userId: string;
	private filledOneTest: boolean = false;
	private selectedIndex: number = 0;
	private enrollmentInfoFormGroup: FormGroup[] = new Array(5);

	constructor(
		private formBuilder: FormBuilder,
		private enrollmentService: EnrollmentServiceService,
		changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
		private route: ActivatedRoute,
		private datePipe: DatePipe
	) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}

	ngOnInit(): void {
		this.userId = this.route.snapshot.params.student;
		this.initializeForms();
	}

	ngAfterViewInit() {
		this.fillForms();
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

	private fillForms(): void {
		for (let i = 0; i < this.enrollmentInfoFormGroup.length; i++) {
			this.enrollmentService.getEnrollmentInformation(i).then(snap => {
				if (snap.data() != undefined && snap.data() != null) {
					this.enrollmentInfoFormGroup[i].patchValue(snap.data());
					for (let key in snap.data()) {
						if (snap.data()[key] != null && snap.data()[key] != null && (snap.data()[key].constructor.name == "Timestamp" || snap.data()[key].constructor.name == 't')) {
							snap.data()[key].seconds += 100;
							this.enrollmentInfoFormGroup[i].get(key).setValue(this.datePipe.transform(snap.data()[key].toDate(), 'yyyy-MM-dd'));
							//; 
						}
					}
					this.enrollmentInfoFormGroup[i].markAsDirty();
					//this.enrollmentInfoFormGroup[i].disable();
					this.filledOneTest = true;
				}else{
					//this.enrollmentInfoFormGroup[i].disable();
				}
				this.enrollmentInfoFormGroup[i].disable();
				if (this.enrollmentInfoFormGroup[i].invalid && !this.enrollmentInfoFormGroup[0].invalid && this.selectedIndex < 1) {
					this.selectedIndex = i;
				}
			});
			//this.enrollmentInfoFormGroup[i].disable();
		}
	}
}
