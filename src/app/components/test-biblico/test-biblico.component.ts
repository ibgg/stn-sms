import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
	selector: 'app-test-biblico',
	templateUrl: './test-biblico.component.html',
	styleUrls: ['./test-biblico.component.css']
})
export class TestBiblicoComponent implements OnInit {
	@Input() mobileQuery: MediaQueryList;
	jesusLifeFG: FormGroup;
	bibleDescriptionFG: FormGroup;
	bibleQuestionsFG: FormGroup;
	saveAttempt: Boolean = false;

	regex: RegExp = /\S+/g;
	MINJESUSLIFEWORDS:number = 800;

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.buildForms();
	}

	buildForms() {
		this.jesusLifeFG = this.formBuilder.group({
			jesusLifeDescription: ['', [Validators.required, this.minWordsValidator()]],
		});
		this.bibleDescriptionFG = this.formBuilder.group({
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

		this.bibleQuestionsFG = this.formBuilder.group({
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
	}

	minWordsValidator():ValidatorFn {
		return (control: AbstractControl): {[key: string]: any} | null => {
			const words = control.value.match(this.regex) != null ? control.value.match(this.regex).length: 0;
			return words < this.MINJESUSLIFEWORDS ? {'minWords': {value: true}} : null;
		  };  
	}
}
