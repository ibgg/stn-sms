import { Injectable, NgZone } from '@angular/core';

import { User } from '../User';
import { auth } from 'firebase/app';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	//verifiedEmail: boolean = false;
	success:string;
	email:string;
	userData: any;
	error: any;
	defaultPhotoUrl: string = "gs://tsn-sms.appspot.com/avatar.png";

	constructor( 
		public afs: AngularFirestore,
		public afAuth: AngularFireAuth,
		public router: Router,
		public ngZone: NgZone
	) { 
		this.getUserData();
		this.afAuth.authState.subscribe(user => {
			if (user){
				if (this.userData == null){
					this.userData = {
						uid: user.uid,
						email: user.email,
						displayName: user.displayName,
						photoURL: user.photoURL !== null ? user.photoURL : '../../../../assets/images/avatar.png',
						emailVerified: user.emailVerified
					}
					if (user.emailVerified){
						this.setUserData();
						this.saveUserData(this.userData);
						this.ngZone.run(() => {
							this.router.navigate(['dashboard']);
						});
					}else{
						console.info("Non verified user");
					}
				}else{
					console.info("user data not null");
				}
			}else{
			}
		});
	}

	async signInWithEmailAndPassword(email:string , password: string){
		this.error = "";
		let me = this;
		try {
			const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((resp)=>{
				if (!resp.user.emailVerified){
					this.ngZone.run(() => {
						this.router.navigate(['verify-email-address']);
					});	
				}
			}).catch((error)=>{
				console.log("error trying sign with email and password", error.message);
				this.error = error.message;
			});
			//this.setUserData(result.user);
		}
		catch (error) {
			me.error = error;
		}	
	}

	async signIn(email: string, password: string, rememberMe:boolean){
		let me = this;
		this.error = "";
		if (rememberMe !== null && !rememberMe) {
			this.afAuth.auth.setPersistence(auth.Auth.Persistence.SESSION).then(async () => {
				this.signInWithEmailAndPassword(email, password);
			}).catch(function (error) {
				this.error = error.message;
			});
		}else if (rememberMe){
			this.afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL).then(async () => {
				this.signInWithEmailAndPassword(email, password);	
			}).catch(function (error) {
				this.error = error.message;		
			})
		}
	}

	async signUp(email: string, password: string, name: string, lastname: string, rememberMe:boolean){
		this.error = "";
		try {
			let me = this;
			let result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(function (res){
				let user = res.user;
				user.sendEmailVerification()
				.then(() => {
					me.ngZone.run(() => {
						me.router.navigate(['verify-email-address']);
					});
				}).catch((error) => {
					console.log("Error trying send email verification", error);
					this.error = error.message;
				});
				user.updateProfile({
					displayName: name + " " + lastname
				}).then(function () {
				}).catch(function (error){
					console.log("Impossible update profile", error);
				});
			}).catch((error) => {
				console.error("Error creating user...", error);
				this.error = error.message;
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
		}).catch((error) => {
			console.error("Error trying send email verification", error);
			this.error = error.message;
		});
	}

	async forgotPassword(email: string){
		this.error = "";
		console.log("Here trying recover password...");
		return this.afAuth.auth.sendPasswordResetEmail(email)
		.then(() => {
			this.success = "Se ha enviado un correo para restablecer tu contraseña, por favor revisa tu correo";
			//window.alert('Se ha enviado un correo para restablecer tu contraseña, por favor revisa tu correo');
		}).catch((error) => {
			this.error = error.message; 
		});	
	}

	get isLoggedIn() : boolean {
		return this.userData == null ? false : true;
	}

	googleAuth(){
		this.error = "";
		return this.loginMeByGoogle(new auth.GoogleAuthProvider());
	}

	async loginMeByGoogle(provider) {
		this.error = "";
		return this.afAuth.auth.signInWithPopup(provider)
			.then((result) => {
				console.info("Signed in with google provider");
			}).catch((error) => {
				this.error = error.message;
			});
	}
	
	async setUserData(){
		this.error = "";
		const userRef: AngularFirestoreDocument <any> = this.afs.doc(`users/${this.userData.uid}`);
		/*
		let userData = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL !== null ? user.photoURL : '../../../../assets/images/avatar.png',
			emailVerified: user.emailVerified
		}*/
		
		return userRef.set(this.userData, {merge: true});
	}

	async signOut(){
		return this.afAuth.auth.signOut().then(() => {
			this.userData = null;
			window.localStorage.setItem('userData', this.userData);
			this.router.navigate(['sign-in']);
		}).catch((error) => {
			this.error = error.message;
		});
	}

	// Para mejorar el performance
	// Persistir localmente los datos del usuario
	// Si la autenticación falla, eliminar los datos persistidos
	// En el constructor, obtener los datos desde el store local
	// Si la autenticación es correcta, se persisten los datos en local

	private saveUserData(userData: User): void {
		window.localStorage.setItem('userData', JSON.stringify(userData));
	}

	private getUserData(){
		this.userData = JSON.parse(window.localStorage.getItem('userData'));
	}
}
