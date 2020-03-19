import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator, FormArray, FormControl } from '@angular/forms';
import { PsicoQuestions } from './psico-questions';
import { Chrono } from './chrono';

@Component({
	selector: 'app-test-psicologico',
	templateUrl: './test-psicologico.component.html',
	styleUrls: ['./test-psicologico.component.css']
})
export class TestPsicologicoComponent implements OnInit {
	psicologicalTestFG: FormGroup;
	started:boolean = false;
	psicoQuestions:any = PsicoQuestions;
	chronometer: Chrono;
	
	constructor(private formBuilder: FormBuilder) { 
	}

	ngOnInit(): void {
		let group = {};

		for (let i = 0; i < this.psicoQuestions.length; i++){
			group["question"+i] = new FormControl('', [Validators.required]);
		}

		this.psicologicalTestFG = new FormGroup(group);
		this.chronometer = new Chrono();
		this.chronometer.startTimer();
	}

	start():void {
		this.started = true;
	}

	saveData():void {
		this.chronometer.stopTimer();
	}
}
