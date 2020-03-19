import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-test-personal',
	templateUrl: './test-personal.component.html',
	styleUrls: ['./test-personal.component.css']
})
export class TestPersonalComponent implements OnInit {
	conversionFG: FormGroup;
	convicionsFG: FormGroup;
	courtshipAndMarriageFG: FormGroup;
	spiritualGrowthFG: FormGroup;

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.initializeForms();
	}

	initializeForms(): any {
		this.conversionFG = this.formBuilder.group({
			christEncounterDescription:['', Validators.required],
			christBeforeDescription:['', Validators.required],
			christAfterDescription:['', Validators.required],
			baptismDescription:['', Validators.required],
			calledDescription:['', Validators.required]
		});

		this.convicionsFG = this.formBuilder.group({
			moralConvictionsDescription: ['', Validators.required],
			moralInvolvementDescription:['', Validators.required],
			alcoholDrugsDescription:['', Validators.required]
		});

		this.courtshipAndMarriageFG = this.formBuilder.group({
			courtshipThought: ['', Validators.required],
			marriageThought:['', Validators.required]
		});
		
		this.spiritualGrowthFG = this.formBuilder.group({
			godsRelationshipDescription: ['', Validators.required],
			authorityThought: ['', Validators.required]
		})
	}
}
