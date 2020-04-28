import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { BiblicalTestService } from 'src/app/shared/services/db/biblical-test.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-biblical-test-report',
	templateUrl: './biblical-test-report.component.html',
	styleUrls: ['./biblical-test-report.component.css']
})
export class BiblicalTestReportComponent implements OnInit {
	private mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	private userId: string;
	private filledOneTest: boolean = false;
	private selectedIndex: number = 0;
	private completeness: number = 0;

	private biblicalTestFG: FormGroup[] = new Array(3);

	private regex: RegExp = /\S+/g;
	private MINJESUSLIFEWORDS: number = 800;

	constructor(
		private formBuilder: FormBuilder,
		private biblicalTestService: BiblicalTestService,
		private route: ActivatedRoute,
		changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
	) { }

	ngOnInit(): void {
		this.userId = this.route.snapshot.params.student;
		this.biblicalTestService.setUserId(this.userId);
		this.buildForms();

	}

	buildForms() {
		//this.jesusLifeFG = this.formBuilder.group({
		this.biblicalTestFG[0] = this.formBuilder.group({
			jesusLifeDescription: ['', [Validators.required, this.minWordsValidator()]],
		});

		//this.bibleDescriptionFG = this.formBuilder.group({
		this.biblicalTestFG[1] = this.formBuilder.group({
			genesisDesc : ['', Validators.required],
			exodusDesc : ['', Validators.required],
			numbersDesc : ['', Validators.required],
			deuteronomyDesc : ['', Validators.required],
			chrKingsDesc : ['', Validators.required],
			prophetsDesc : ['', Validators.required],
			gospelsDesc : ['', Validators.required],
			actsDesc : ['', Validators.required],
			revelationsDesc : ['', Validators.required],
		});

		//this.bibleQuestionsFG = this.formBuilder.group({
		this.biblicalTestFG[2] = this.formBuilder.group({
			bibleBooksNumber:['', Validators.required],
			abrahamDescription: ['', Validators.required],
			samDescription:['', Validators.required],
			mosesDescription: ['', Validators.required],
			davidDescription: ['', Validators.required],
			pabloDescription: ['', Validators.required],
			pedroDescription: ['', Validators.required],
			salomonsWifes: ['', Validators.required],
			abrahamProof: ['', Validators.required],
			proverbsWriter: ['', Validators.required],
			israelsLandVictory: ['', Validators.required],
			psalmsTopic: ['', Validators.required],
			mesianicProphet: ['', Validators.required],
			mayMinProphets: ['', Validators.required],
			firstIsraelKing: ['', Validators.required],
			godsHearth: ['', Validators.required],
			treasureDis:['', Validators.required],
			motherinlawHeal: ['', Validators.required],
			paulsBefConv: ['', Validators.required],
			ntWriter: ['', Validators.required],
			lawsResume: ['', Validators.required],
			graceMeaning: ['', Validators.required],
			ntCommands: ['', Validators.required],
			salvationPassages: ['', Validators.required],
			spiritualGifts: ['', Validators.required],
			bibleBooks:['', Validators.required]
		});

		this.fillForms();
	}

	private fillForms():void {
		for (let i = 0; i < this.biblicalTestFG.length; i++){
			this.biblicalTestService.getBiblicalTestInformation(i).then(snap => {
				if (snap.data() != undefined && snap.data() != null){
					this.biblicalTestFG[i].patchValue(snap.data());	
					for (let key in snap.data()) {
						if (snap.data()[key] != null && snap.data()[key] != null && (snap.data()[key].constructor.name == "Timestamp" || snap.data()[key].constructor.name == 't')) {
							snap.data()[key].seconds += 100;
							this.biblicalTestFG[i].get(key).setValue(snap.data()[key].toDate());
						}
					}
					this.biblicalTestFG[i].markAsDirty();
					this.filledOneTest = true;
				}
				if (this.biblicalTestFG[i].invalid && !this.biblicalTestFG[0].invalid && this.selectedIndex < 1){
					this.selectedIndex = i;
				}
			});	
		}
	}


	private minWordsValidator():ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} | null => {
			const words = control.value.match(this.regex) != null ? control.value.match(this.regex).length: 0;
			return words < this.MINJESUSLIFEWORDS ? {'minWords': {value: true}} : null;
		  };  
	}

}
