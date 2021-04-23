import { Injectable, NgZone } from '@angular/core';

import { User } from '../../models/user';
import firebase from 'firebase/app';

// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private userSubscription: Subscription;
	success: string;
	email: string;
	userData: any;
	error: any;

	constructor(
		public afs: AngularFirestore,
		public afAuth: AngularFireAuth,
		public router: Router,
		public ngZone: NgZone
	) {
		this.getLocalUserData();
		if (this.userData == null || this.userData == undefined) this.getSessionUserData();
		
		this.afAuth.authState.subscribe(user => {
			if (user) {
				if (this.userData == null) {
					if (user.emailVerified) {
						this.userData = this.buildUserDataFromAuthService(user, undefined);
						this.userData.emailVerified = true;
						this.getUserDataFormServer();
						this.listenUserData();
					} else {
						console.info("Non verified email");
					}
				} else {
					if (user.emailVerified) {
						this.userData.emailVerified = true;
						this.getUserDataFormServer();
						this.listenUserData();
					} else {
						this.signOut();
					}
				}
			} else {
				this.userData = null;
				window.localStorage.setItem('userData', this.userData);
				sessionStorage.setItem('userData', null);
				if (this.router.url.search("dashboard")>0){
					this.ngZone.run(() => {
						this.router.navigate(['sign-in']);
					});
				}
			}
		});
	}

	public async googleAuth(updateUserData:boolean) {
		let me = this;
		this.error = "";
		this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(async () => {
			this.loginMeByGoogle(new firebase.auth.GoogleAuthProvider(), updateUserData);
		}).catch(function (error) {
			me.error = error.message;
		});
		return this.loginMeByGoogle(new firebase.auth.GoogleAuthProvider(), updateUserData);
	}

	private async loginMeByGoogle(provider: firebase.auth.GoogleAuthProvider, updateUserData:boolean) {
		this.error = "";
		return this.afAuth.signInWithPopup(provider)
			.then((resp) => {
				let user = resp.user;
				let userData = this.buildUserDataFromAuthService(user, undefined);
				userData.emailVerified = user.emailVerified;
				this.saveLocalUserData(userData);
				if (updateUserData) this.setUserDataOnDB(userData);
			}).catch((error) => {
				this.error = error.message;
			});
	}

	private async signInWithEmailAndPassword(email: string, password: string) {
		this.error = "";
		let me = this;
		try {
			//this.afAuth.auth.languageCode = 'es';
			const result = await this.afAuth.signInWithEmailAndPassword(email, password).then((resp) => {
				let user = resp.user;
				if (!user.emailVerified) {
					this.ngZone.run(() => {
						this.router.navigate(['verify-email-address']);
					});
				}else{
					let userData = this.buildUserDataFromAuthService(user, undefined);
					userData.emailVerified = user.emailVerified;
					this.saveLocalUserData(userData);
				}
			}).catch((error) => {
				console.error("error trying sign with email and password", error.message);
				this.error = error.message;
			});
		}
		catch (error) {
			me.error = error;
		}
	}

	public async signIn(email: string, password: string) {
		let me = this;
		this.error = "";

		this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(async () => {
			me.signInWithEmailAndPassword(email, password);
		}).catch(function (error) {
			me.error = error.message;
		});
	}

	public async signUpWithEmailAndPassword(email: string, password: string, name: string, lastname: string) {
		this.error = "";
		try {
			let me = this;
			let result = await this.afAuth.createUserWithEmailAndPassword(email, password).then((res) => {
				let userData = this.buildUserDataFromAuthService(res.user, lastname);
				userData.displayName = name + " " + lastname;
				me.setUserDataOnDB(userData);
				this.saveLocalUserData(userData);

				res.user.updateProfile({
					displayName: name + " " + lastname	
				}).then(function (response) {
				}).catch(function (error) {
					console.error("Impossible update profile", error);
				});

				me.sendVerificationMail(res.user);
			}).catch((error) => {
				console.error("Error creating user...", error);
				this.error = error.message;
			});
		}
		catch (error) {
			//window.alert(error.message);
		}
	}

	public async signUp(email: string, password: string, name: string, lastname: string) {
		let me = this;
		this.error = "";
		this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(async () => {
			this.signUpWithEmailAndPassword(email, password, name, lastname);
		}).catch(function (error) {
			me.error = error.message;
		});
	}

	public async sendVerificationMail(user: firebase.User) {
		this.error = "";

		return user.sendEmailVerification().then(() => {
			this.router.navigate(['verify-email-address']);
		}).catch((error) => {
			console.error("Error trying send email verification", error);
			this.error = error.message;
		});
	}

	public async forgotPassword(email: string) {
		this.error = "";
		return this.afAuth.sendPasswordResetEmail(email)
			.then(() => {
				this.success = "Se ha enviado un correo para restablecer tu contraseña, por favor revisa tu correo";
			}).catch((error) => {
				this.error = error.message;
			});
	}

	get isLoggedIn(): boolean {
		return this.userData == null ? false : true;
	}

	public async setUserDataOnDB(userData: any): Promise<void> {
		userData.creationDate = new Date();
		this.error = "";
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userData.uid}`);

		return userRef.set(userData, { merge: true });
	}

	private async updateUserDataOnDB(uid:any, emailVerified: boolean): Promise<void> {
		let lastAccess = new Date();
		this.error = "";
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

		return userRef.set({emailVerified: emailVerified, lastAccess: lastAccess}, { merge: true });
	}

	async signOut() {
		return this.afAuth.signOut().then(() => {
			this.userData = null;
			window.localStorage.setItem('userData', this.userData);
			window.sessionStorage.setItem('userData', null);
			this.router.navigate(['sign-in']);
		}).catch((error) => {
			this.error = error.message;
		});
	}

	private buildUserDataFromAuthService(user: any, lastname: string): any {
		return {
			uid: user.uid,
			email: user.email,
			displayName: lastname != undefined ? user.displayName + " " + lastname : user.displayName,
			photoURL: user.photoURL !== null ? user.photoURL : null,
		}
	}

	private saveLocalUserData(userData: any): void {
		window.localStorage.setItem('userData', JSON.stringify(userData));
	}

	private saveSessionUserData(userData: any): void {
		window.sessionStorage.setItem('userData', JSON.stringify(userData));
	}

	private getLocalUserData(): void {
		this.userData = JSON.parse(window.localStorage.getItem('userData'));
	}

	private getSessionUserData():void {
		this.userData = JSON.parse(window.sessionStorage.getItem('userData'));
	}

	public async handleVerifyEmail(actionCode: string): Promise<void> {
		return this.afAuth.applyActionCode(actionCode).then();
	}

	public verifyPasswordReset(actionCode: string): Promise<string> {
		return this.afAuth.verifyPasswordResetCode(actionCode);
	}

	public confirmPasswordReset(actionCode: string, newPassword: string): Promise<void> {
		return this.afAuth.confirmPasswordReset(actionCode, newPassword);
	}

	public getUserDataFormServer():void{
		this.afs.doc<User>(`users/${this.userData.uid}`).ref.get().then((snap)=>{
			if (snap.data()){
				this.userData = snap.data();
				this.userData.emailVerified=true;
				this.updateUserDataOnDB(this.userData.uid, true);
				if (snap.data().role != undefined && snap.data().role =="admin"){
					this.router.navigate(['admin']);
				}else if (this.router.url.search("dashboard") <= 0) {
					this.ngZone.run(() => {
						this.router.navigate(['dashboard']);
					});	
				}
			}
		})
	}

	public listenUserData(): void {
		this.userSubscription = this.afs.doc<User>(`users/${this.userData.uid}`).valueChanges().subscribe((userData) => {
			this.userData = userData;
			this.userData.emailVerified=true;
		});
	}

	public stopListenUserUpdates() {
		if (this.userSubscription != null) this.userSubscription.unsubscribe();
	}

	public setFormCompletude(userId: string, data: any): Promise<void> {
		return this.afs.doc(`users/${userId}`).set(data, { merge: true });
	}
}
