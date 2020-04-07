import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Conversion } from '../../models/conversion';
import { Convictions } from '../../models/convictions';
import { CourtshipAndMarriage } from '../../models/courtshipAndMarriage';
import { SpiritualGrowth } from '../../models/spiritualGrowth';
import { Called } from '../../models/called';
import { Health } from '../../models/health';
//import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PersonalTestService {
	private userId: string;
	constructor(private afs: AngularFirestore) { }

	setUserId(userId: string): void{
		this.userId = userId;
	}

	public getPersonalTestInformation(id:number): Promise<any>{
		switch(id){
			case 0:
				return this.afs.doc(`users/${this.userId}/personalTest/conversion`).ref.get();
			case 1:
				return this.afs.doc(`users/${this.userId}/personalTest/convictions`).ref.get();
			case 2:
				return this.afs.doc(`users/${this.userId}/personalTest/courtshipAndMarriage`).ref.get();
			case 3:
				return this.afs.doc(`users/${this.userId}/personalTest/spiritualGrowth`).ref.get();
			case 4:
				return this.afs.doc(`users/${this.userId}/personalTest/called`).ref.get();
			case 5:
				return this.afs.doc(`users/${this.userId}/personalTest/health`).ref.get();
		}
	}

	public listenPersonalTestInformation(id:number): Observable<any>{
		switch(id){
			case 0:
				return this.afs.doc(`users/${this.userId}`).collection('personalTest').doc<Conversion>('conversion').valueChanges();
			case 1:
				return this.afs.doc(`users/${this.userId}`).collection('personalTest').doc<Convictions>('convictions').valueChanges();
			case 2:
				return this.afs.doc(`users/${this.userId}`).collection('personalTest').doc<CourtshipAndMarriage>('courtshipAndMarriage').valueChanges();
			case 3:
				return this.afs.doc(`users/${this.userId}`).collection('personalTest').doc<SpiritualGrowth>('spiritualGrowth').valueChanges();
			case 4:
				return this.afs.doc(`users/${this.userId}`).collection('personalTest').doc<Called>('called').valueChanges();
			case 5:
				return this.afs.doc(`users/${this.userId}`).collection('personalTest').doc<Health>('health').valueChanges();
		}
	}

	public updatePersonalTestInformation(id:number, data: any):void{
		switch(id){
			case 0:
				this.afs.doc(`users/${this.userId}`).collection('personalTest').doc('conversion').set(data, { merge: true });
				break;
			case 1:
				this.afs.doc(`users/${this.userId}`).collection('personalTest').doc('convictions').set(data, { merge: true });
				break;
			case 2:
				this.afs.doc(`users/${this.userId}`).collection('personalTest').doc('courtshipAndMarriage').set(data, { merge: true });
				break;
			case 3:
				this.afs.doc(`users/${this.userId}`).collection('personalTest').doc('spiritualGrowth').set(data, { merge: true });
				break;
			case 4:
				this.afs.doc(`users/${this.userId}`).collection('personalTest').doc('called').set(data, { merge: true });
				break;
			case 5:
				this.afs.doc(`users/${this.userId}`).collection('personalTest').doc('health').set(data, { merge: true });
				break;			
		}
	}
}
