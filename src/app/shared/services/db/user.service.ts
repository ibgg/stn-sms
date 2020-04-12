import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	constructor(private afs: AngularFirestore) { }

	public listenUserData(userId:string):Observable<User> {
	  return this.afs.doc<User>(`users/${userId}`).valueChanges();
	}
  
	public setFormCompletude(userId:string, data:any):Promise<void>{
		return this.afs.doc(`users/${userId}`).set(data, {merge:true});
	}  
}
