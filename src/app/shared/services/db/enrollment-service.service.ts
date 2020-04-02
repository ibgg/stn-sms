import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChange, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PersonalInformation } from '../../models/personalInformation';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EnrollmentServiceService {
	userId:string;
	constructor(private afs: AngularFirestore) { }

	setUserId(userId:string):void{
		this.userId = userId;
		console.log("UserId: ", this.userId);
	}

	listenPersonalInformation(): Observable<PersonalInformation> {
		//return this.afs.doc(`users/${userId}`).collection<PersonalInformation>('enrollment').valueChanges();
		return this.afs.doc(`users/${this.userId}`).collection('enrollment').doc<PersonalInformation>('personalInformation').valueChanges();
	}

	/*
	getPersonalInformation():PersonalInformation {
		//return this.afs.doc(`users/${this.userId}`).collection('enrollment').doc<PersonalInformation>('personalInformation').get();
	}*/

	updatePersonalInformation(data: any) {
		this.afs.doc(`users/${this.userId}`).collection('enrollment').doc('personalInformation').set(data, { merge: true });
	}

}
