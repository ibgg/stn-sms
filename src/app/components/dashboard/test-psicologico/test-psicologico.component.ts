import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PsicoQuestions } from './psico-questions';
import { Chrono } from './chrono';
import { PsychologicalService } from 'src/app/shared/services/db/psychological.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-test-psicologico',
	templateUrl: './test-psicologico.component.html',
	styleUrls: ['./test-psicologico.component.css']
})
export class TestPsicologicoComponent implements OnInit {
	private userId: string;
	private psicologicalTestFG: FormGroup;

	private serviceListener: any;

	private started:boolean = false;
	private psicoQuestions:any = PsicoQuestions;
	private chronometer: Chrono;
	private subscriberChrono:Subscription;
	
	constructor(private psychoTestService: PsychologicalService,		
		public authService: AuthService) {
	}


	ngOnInit(): void {
		this.userId = this.authService.userData.uid;
		this.psychoTestService.setUserId(this.userId);
		let group = {};

		for (let i = 0; i < this.psicoQuestions.length; i++){
			group["question"+i] = new FormControl('', Validators.required);//{value: '', disabled:!this.started}
		}

		this.psicologicalTestFG = new FormGroup(group);
		this.chronometer = new Chrono();

		this.serviceListener = this.psychoTestService.listenPsychoTestInformation(0);
		this.updatePsychoTestInformation({selectedIndex:0});
		this.listenFormStatus();
	}

	private updatePsychoTestInformation(event: any): void {
		this.serviceListener = this.psychoTestService.listenPsychoTestInformation(event.selectedIndex);

		this.psychoTestService.getPyschoTimer().get().then(snap => {
			if (snap.data() != undefined && snap.data() != null){
				this.chronometer.setupStartTime(snap.data().chronoTime);
				if (snap.data().chronoTime > 0) {
					//this.started = true;
				}
			}
		});

		this.serviceListener.subscribe(ad => {
			if (ad != undefined && ad != null) {
				//this.psicologicalTestFG.patchValue(ad);
				for (let key in ad) {
					if (this.psicologicalTestFG.get(key).value == ad[key]) continue;
					else this.psicologicalTestFG.get(key).setValue(ad[key]);
					if (this.psicologicalTestFG.get(key).value != null && this.psicologicalTestFG.get(key).value != undefined && this.psicologicalTestFG.get(key).value != "") this.psicologicalTestFG.get(key).disable();
				}
			}
		});
	}

	savePsychoTestInfo(formId: number, keyControl: string): void {
		console.log("Trying save... ", keyControl);
		if (this.psicologicalTestFG.get(keyControl).errors != null) {
			console.debug("Impossible save data for this control...", this.psicologicalTestFG.get(keyControl).errors);
			return;
		}

		const fieldValue = this.psicologicalTestFG.get(keyControl).value;
		let data = {};
		data[keyControl] = fieldValue;
		this.psychoTestService.updatePsychoTestInformation(formId, data);
	}	

	start():void {
		this.started = true;

		this.subscriberChrono = this.chronometer.startTimer().subscribe(event => {
			this.psychoTestService.updatePsychotimer({chronoTime:event});
		});
	}

	saveData():void {
		if (this.subscriberChrono != undefined && this.subscriberChrono != null)
			this.subscriberChrono.unsubscribe();

		this.psicologicalTestFG.disable();
		this.chronometer.stopTimer();
	}

	private listenFormStatus():void {
		this.psicologicalTestFG.statusChanges.subscribe((satus) => {
			if (status == 'VALID'){
				this.authService.setFormCompletude(this.authService.userData.uid, {"psychologicalTestCompleteness": 100});
			}
		});
	}
}
