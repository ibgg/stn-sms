import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
	providedIn: 'root'
})
export class StudentsDataService {

	constructor(private afs: AngularFirestore) {
	}

	public listenUserData(): Observable<any> {
		return this.afs.collection<User>(`users`).valueChanges();
	}
}
