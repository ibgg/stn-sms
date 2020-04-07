import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { BibleDescription } from '../../models/bibleDescription';
import { BibleQuestions } from '../../models/bibleQuestions';

@Injectable({
	providedIn: 'root'
})
export class BiblicalTestService {
	private userId:string;
	constructor(private afs: AngularFirestore) { }

	setUserId(userId: string): void {
		this.userId = userId;
	}

	public getBiblicalTestInformation(id: number): Promise<any> {
		switch (id) {
			case 0:
				return this.afs.doc(`users/${this.userId}/biblicalTest/jesusLife`).ref.get();
			case 1:
				return this.afs.doc(`users/${this.userId}/biblicalTest/bibleDescription`).ref.get();
			case 2:
				return this.afs.doc(`users/${this.userId}/biblicalTest/bibleQuestions`).ref.get();
		}
	}

	public listenBiblicalTestInformation(id: number): Observable<any> {
		switch (id) {
			case 0:
				return this.afs.doc(`users/${this.userId}`).collection('biblicalTest').doc<any>('jesusLife').valueChanges();
			case 1:
				return this.afs.doc(`users/${this.userId}`).collection('biblicalTest').doc<BibleDescription>('bibleDescription').valueChanges();
			case 2:
				return this.afs.doc(`users/${this.userId}`).collection('biblicalTest').doc<BibleQuestions>('bibleQuestions').valueChanges();
		}
	}

	public updateBiblicalTestInformation(id:number, data: any):void{
		switch(id){
			case 0:
				this.afs.doc(`users/${this.userId}`).collection('biblicalTest').doc('jesusLife').set(data, { merge: true });
				break;
			case 1:
				this.afs.doc(`users/${this.userId}`).collection('biblicalTest').doc('bibleDescription').set(data, { merge: true });
				break;
			case 2:
				this.afs.doc(`users/${this.userId}`).collection('biblicalTest').doc('bibleQuestions').set(data, { merge: true });
				break;			
		}
	}
}
