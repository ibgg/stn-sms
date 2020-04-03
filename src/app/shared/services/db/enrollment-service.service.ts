import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChange, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PersonalInformation } from '../../models/personalInformation';
import { ProfessionalAndAcademicInfo } from '../../models/professionalAndAcademicInfo';
import { ChristianExperience } from '../../models/christianExperience';
import { TutorInformation } from '../../models/tutorInformation';

@Injectable({
	providedIn: 'root'
})
export class EnrollmentServiceService {
	userId:string;
	constructor(private afs: AngularFirestore) { }

	setUserId(userId:string):void{
		this.userId = userId;
	}

	listenEnrollmentInformation(id:number): Observable<any> {
		switch(id){
			case 0:
				return this.afs.doc(`users/${this.userId}`).collection('enrollment').doc<PersonalInformation>('personalInformation').valueChanges();
			case 1:
				return this.afs.doc(`users/${this.userId}`).collection('enrollment').doc<ProfessionalAndAcademicInfo>('professionalAndAcademicInfo').valueChanges();
			case 2:
				return this.afs.doc(`users/${this.userId}`).collection('enrollment').doc<ChristianExperience>('christianExperience').valueChanges();
			case 3:
				return this.afs.doc(`users/${this.userId}`).collection('enrollment').doc<TutorInformation>('tutorInformation').valueChanges();
			case 4:
				return this.afs.doc(`users/${this.userId}`).collection('enrollment').doc<any>('seminaryInformation').valueChanges();
		}
	}

	updateEnrollmentInformation(id:number, data: any){
		switch(id){
			case 0:
				this.afs.doc(`users/${this.userId}`).collection('enrollment').doc('personalInformation').set(data, { merge: true });
				break;
			case 1:
				this.afs.doc(`users/${this.userId}`).collection('enrollment').doc('professionalAndAcademicInfo').set(data, { merge: true });
				break;
			case 2:
				this.afs.doc(`users/${this.userId}`).collection('enrollment').doc('christianExperience').set(data, { merge: true });
				break;
			case 3:
				this.afs.doc(`users/${this.userId}`).collection('enrollment').doc('tutorInformation').set(data, { merge: true });
				break;
			case 4:
				this.afs.doc(`users/${this.userId}`).collection('enrollment').doc('seminaryInformation').set(data, { merge: true });
				break;
		}
	}
}
