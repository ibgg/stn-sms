import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form, ValidatorFn, AbstractControl } from '@angular/forms';
import { BiblicalTestService } from 'src/app/shared/services/db/biblical-test.service';

@Component({
	selector: 'app-test-biblico',
	templateUrl: './test-biblico.component.html',
	styleUrls: ['./test-biblico.component.css']
})
export class TestBiblicoComponent implements OnInit {
	@Input() mobileQuery: MediaQueryList;
	@Input() private userId: string;

	serviceListener: any;

	private biblicalTestFG: FormGroup[] = new Array(3);
	saveAttempt: Boolean = false;

	regex: RegExp = /\S+/g;
	MINJESUSLIFEWORDS:number = 5;

	constructor(private formBuilder: FormBuilder, private biblicalTestService: BiblicalTestService) { }

	ngOnInit(): void {
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

		this.serviceListener = this.biblicalTestService.listenBiblicalTestInformation(0);
		this.updateBiblicalTestInformation({selectedIndex:0});
	}

	private updateBiblicalTestInformation(event: any): void {
		this.serviceListener = this.biblicalTestService.listenBiblicalTestInformation(event.selectedIndex);

		this.serviceListener.subscribe(ad => {
			if (ad != undefined && ad != null) {
				this.biblicalTestFG[event.selectedIndex].patchValue(ad);
				for (let key in ad) {
					if (ad[key] != null && ad[key] != null && (ad[key].constructor.name == "Timestamp" || ad[key].constructor.name == 't')) {
						ad[key].seconds += 100;
						this.biblicalTestFG[event.selectedIndex].get(key).setValue(ad[key].toDate());
					}
				}
			}
		});
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
