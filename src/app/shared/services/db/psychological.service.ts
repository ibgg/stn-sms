import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentSnapshot, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PsychologicalService {
	private userId:string;
	constructor(private afs: AngularFirestore) { }

	setUserId(userId: string): void {
		this.userId = userId;
	}

	public getPyschoTimer():DocumentReference {
		return this.afs.doc(`users/${this.userId}/psychoTest/psychoTime`).ref;
	}

	public updatePsychotimer(data: any): void {
		this.afs.doc(`users/${this.userId}`).collection('psychoTest').doc('psychoTime').set(data, { merge: true });
	}

	public listenPsychoTestInformation(id: number): Observable<any> {
		return this.afs.doc(`users/${this.userId}`).collection('psychoTest').doc<any>('general').valueChanges();
	}

	public updatePsychoTestInformation(id:number, data: any):void{
		this.afs.doc(`users/${this.userId}`).collection('psychoTest').doc('general').set(data, { merge: true });
	}
}
