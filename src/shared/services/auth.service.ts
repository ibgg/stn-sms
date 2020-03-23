import { Injectable, NgZone } from '@angular/core';

import { User } from '../services/User';
import { auth } from 'firebase/app';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	userData: any;
	error: any;

	constructor( 
		public afs: AngularFirestore,
		public afAuth: AngularFireAuth,
		public router: Router,
		public ngZone: NgZone
	) { 
		this.afAuth.authState.subscribe(user => {
			if (user){
				this.userData = user;
				localStorage.setItem('user', JSON.stringify(this.userData));
				JSON.parse(localStorage.getItem('user'));
				this.ngZone.run(() => {
					this.router.navigate(['dashboard']);
				});
			}else{
				localStorage.setItem('user', null);
				JSON.parse(localStorage.getItem('user'));
			}
		});
	}

	async signIn(email: string, password: string){
		let me = this;
		this.error = "";
		return this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then((result) => {
				/*
				this.ngZone.run(() => {
					this.router.navigate(['dashboard']);
				});
				*/
				this.error = null;
				this.setUserData(result.user);
			}).catch(function (error) {
				me.error = error;
			});
	}

	async signUp(email: string, password: string, name: string, lastname: string){
		this.error = "";
		try {
			let me = this;
			let result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(function (res){
				//this.sendVerificationMail();
				let user = res.user;
				user.updateProfile({
					displayName: name + " " + lastname
				}).then(function () {
					me.setUserData(res.user);
					//me.sendVerificationMail();
					me.setUserData(user);
					me.signIn(email, password);
				}).catch(function (error){
					console.log("Impossible update username")
				});
			});
		}
		catch (error) {
			//window.alert(error.message);
		}
	}

	async sendVerificationMail(){
		this.error = "";
		return this.afAuth.auth.currentUser.sendEmailVerification()
		.then(() => {
			this.router.navigate(['verify-email-address']);
		});
	}

	async forgotPassword(passwordResetEmail: string){
		this.error = "";
		return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
		.then(() => {
			window.alert('Se ha enviado un correo para restablecer tu contraseña, por favor revisa tu correo');
		}).catch((error) => {
			window.alert(error);
		});
	}

	get isLoggedIn() : boolean {
		const user = JSON.parse(localStorage.getItem('user'));
		return (user !== null && user.emailVerified !== false) ? true : false;
	}

	googleAuth(){
		this.error = "";
		return this.loginMeByGoogle(new auth.GoogleAuthProvider());
	}

	async loginMeByGoogle(provider) {
		this.error = "";
		return this.afAuth.auth.signInWithPopup(provider)
			.then((result) => {
				/* 
				this.ngZone.run(() => {
					this.router.navigate(['dashboard']);
				});
				*/
				let userRef = this.setUserData(result.user);
			}).catch((error) => {
				window.alert(error);
			});
	}
	
	async setUserData(user){
		this.error = "";
		const userRef: AngularFirestoreDocument <any> = this.afs.doc(`users/${user.uid}`);
		const userData: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			emailVerified: user.emailVerified
		}
		
		return userRef.set(userData, {merge: true});
	}

	async signOut(){
		return this.afAuth.auth.signOut().then(() => {
			localStorage.removeItem('user');
			this.router.navigate(['sign-in']);
		})
	}
}
