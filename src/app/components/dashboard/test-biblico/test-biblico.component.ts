import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form, ValidatorFn, AbstractControl, FormGroupDirective } from '@angular/forms';
import { BiblicalTestService } from 'src/app/shared/services/db/biblical-test.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
	selector: 'app-test-biblico',
	templateUrl: './test-biblico.component.html',
	styleUrls: ['./test-biblico.component.css'],
	providers: [{
		provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false, showError: true}
	  }]
})
export class TestBiblicoComponent implements OnInit {
	private errorMessage:string = "Formulario incompleto";
	private mobileQuery: MediaQueryList;
	private _mobileQueryListener: () => void;
	private userId: string;
	private filledOneTest:boolean = false;
	private selectedIndex:number = 0;

	private biblicalTestFG: FormGroup[] = new Array(3);

	private regex: RegExp = /\S+/g;
	private MINJESUSLIFEWORDS:number = 800;

	@ViewChild('biblicalTestForm0')
	private biblicalTestForm0: FormGroupDirective;
	@ViewChild('biblicalTestForm1')
	private biblicalTestForm1: FormGroupDirective;
	@ViewChild('biblicalTestForm2')
	private biblicalTestForm2: FormGroupDirective;

	constructor(private formBuilder: FormBuilder, 
		private biblicalTestService: BiblicalTestService,
		public authService: AuthService,
		changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
			this.mobileQuery = media.matchMedia('(max-width: 600px)');
			this._mobileQueryListener = () => changeDetectorRef.detectChanges();
			this.mobileQuery.addListener(this._mobileQueryListener);	
	}

	ngOnInit(): void {
		this.userId = this.authService.userData.uid;
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
		this.evaluateCurrentForm({selectedIndex:0});
	}

	fillForms():void {
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
				if (this.biblicalTestFG[i].invalid && (this.selectedIndex < 1)){
					this.selectedIndex = i;
				}
			});	
		}
	}

	// Listen for incomming changes in db
	private evaluateCurrentForm(event: any): void {
		if (this.biblicalTestFG[event.selectedIndex].dirty){
			let evaluate = "this.biblicalTestForm"+event.selectedIndex+".onSubmit('undefined')";
			eval(evaluate);
		}
	}

	saveBiblicalTestInfo(formId: number, keyControl: string): void {
		if (this.biblicalTestFG[formId].get(keyControl).errors != null) {
			console.debug("Impossible save data for this control...", this.biblicalTestFG[formId].get(keyControl).errors);
			return;
		}

		const fieldValue = this.biblicalTestFG[formId].get(keyControl).value;
		let data = {};
		data[keyControl] = fieldValue;
		this.biblicalTestService.updateBiblicalTestInformation(formId, data);
	}

	minWordsValidator():ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} | null => {
			const words = control.value.match(this.regex) != null ? control.value.match(this.regex).length: 0;
			return words < this.MINJESUSLIFEWORDS ? {'minWords': {value: true}} : null;
		  };  
	}
}
