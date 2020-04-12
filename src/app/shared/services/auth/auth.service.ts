import { Injectable, NgZone } from '@angular/core';

import { User } from '../../models/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	//verifiedEmail: boolean = false;
	private userSubscription:Subscription;
	success:string;
	email:string;
	userData: any;
	error: any;
	private defaultPhotoUrl: string = '../../../../assets/images/avatar.png';

	constructor( 
		public afs: AngularFirestore,
		public afAuth: AngularFireAuth,
		public router: Router,
		public ngZone: NgZone
	) { 
		console.log("Here in the constructor");
		this.getLocalUserData();
		this.afAuth.authState.subscribe(user => {
			if (user){
				if (this.userData == null){
					console.info("Userdata null", user);
					this.userData = this.buildUserDataFromAuthService(user, undefined);
					console.log("this.userData", this.userData);
					if (user.emailVerified){
						console.info("Verified email...");
						this.userData.emailVerified = true;
						this.listenUserData();
						this.ngZone.run(() => {
							this.router.navigate(['dashboard']);
						});
					}else{
						console.info("Non verified email");
					}
				}else{
					console.info("user data not null");
					if (user.emailVerified){
						this.userData.emailVerified = true;
						this.listenUserData();
						this.ngZone.run(() => {
							this.router.navigate(['dashboard']);
						});
					}else{
						console.info("Non verified user");
					}
				}
			}else{
				console.log("USer null");
				this.userData = null;
				window.localStorage.setItem('userData', this.userData);
			}
		});
	}

	public async googleAuth(rememberMe:boolean){
		let me = this;
		this.error = "";
		if (rememberMe !== null && !rememberMe) {
			this.afAuth.auth.setPersistence(auth.Auth.Persistence.SESSION).then(async () => {
				this.loginMeByGoogle(new auth.GoogleAuthProvider(), rememberMe);
			}).catch(function (error) {
				me.error = error.message;
			});
		}else if (rememberMe){
			this.afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL).then(async () => {
				this.loginMeByGoogle(new auth.GoogleAuthProvider(), rememberMe);
			}).catch(function (error) {
				me.error = error.message;		
			})
		}		
		return this.loginMeByGoogle(new auth.GoogleAuthProvider(), rememberMe);
	}

	private async loginMeByGoogle(provider: auth.GoogleAuthProvider, rememberMe:boolean) {
		this.error = "";
		return this.afAuth.auth.signInWithPopup(provider)
			.then((resp) => {
				console.info("Signed in with google provider");
				let user = resp.user;
				let userData = this.buildUserDataFromAuthService(user,undefined);
				if (rememberMe){
					this.saveLocalUserData(userData);
				}
				this.setUserDataOnDB(userData);
			}).catch((error) => {
				this.error = error.message;
			});
	}

	private async signInWithEmailAndPassword(email:string , password: string, rememberMe:boolean){
		this.error = "";
		let me = this;
		try {
			const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((resp)=>{
				let user = resp.user;
				if (!user.emailVerified){
					this.ngZone.run(() => {
						this.router.navigate(['verify-email-address']);
					});	
				}
				if (rememberMe){
					let userData = this.buildUserDataFromAuthService(user, undefined);
					userData.emailVerified = user.emailVerified;
					this.saveLocalUserData(userData);
				}
			}).catch((error)=>{
				console.log("error trying sign with email and password", error.message);
				this.error = error.message;
			});
		}
		catch (error) {
			me.error = error;
		}	
	}	

	public async signIn(email: string, password: string, rememberMe:boolean){
		let me = this;
		this.error = "";
		if (rememberMe !== null && !rememberMe) {
			this.afAuth.auth.setPersistence(auth.Auth.Persistence.SESSION).then(async () => {
				me.signInWithEmailAndPassword(email, password, rememberMe);
			}).catch(function (error) {
				me.error = error.message;
			});
		}else if (rememberMe){
			this.afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL).then(async () => {
				me.signInWithEmailAndPassword(email, password, rememberMe);	
			}).catch(function (error) {
				me.error = error.message;		
			})
		}
	}

	public async signUpWithEmailAndPassword(email: string, password: string, name: string, lastname: string, rememberMe:boolean){
		this.error = "";
		try {
			let me = this;
			let result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((res) => {
				let userData = this.buildUserDataFromAuthService(res.user, lastname);
				userData.displayName = name + " " + lastname;
				console.log("Local user data", userData);
				me.setUserDataOnDB(userData);
				if (rememberMe) {
					console.log("Rememberme enabled....", rememberMe);
					this.saveLocalUserData(userData);
				}

				res.user.updateProfile({
					displayName: name + " " + lastname
				}).then(function (response) {
				}).catch(function (error){
					console.log("Impossible update profile", error);
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

	public async signUp(email: string, password: string, name: string, lastname: string, rememberMe: boolean){
		let me = this;
		this.error = "";
		if (rememberMe !== null && !rememberMe) {
			this.afAuth.auth.setPersistence(auth.Auth.Persistence.SESSION).then(async () => {
				console.log("Session...");
				this.signUpWithEmailAndPassword(email, password, name, lastname, rememberMe);
			}).catch(function (error) {
				me.error = error.message;
			});
		}else if (rememberMe){
			this.afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL).then(async () => {
				console.log("Local");
				this.signUpWithEmailAndPassword(email, password, name, lastname, rememberMe);
			}).catch(function (error) {
				me.error = error.message;		
			})		
		}
	}

	public async sendVerificationMail(user:firebase.User){
		this.error = "";
		
		return user.sendEmailVerification().then(() => {
			this.router.navigate(['verify-email-address']);
		}).catch((error) => {
			console.error("Error trying send email verification", error);
			this.error = error.message;
		});
	}

	public async forgotPassword(email: string){
		this.error = "";
		console.log("Here trying recover password...");
		return this.afAuth.auth.sendPasswordResetEmail(email)
		.then(() => {
			this.success = "Se ha enviado un correo para restablecer tu contraseña, por favor revisa tu correo";
		}).catch((error) => {
			this.error = error.message; 
		});	
	}

	get isLoggedIn() : boolean {
		return this.userData == null ? false : true;
	}
	
	public async setUserDataOnDB(userData:any):Promise<void>{
		this.error = "";
		const userRef: AngularFirestoreDocument <any> = this.afs.doc(`users/${userData.uid}`);

		return userRef.set(userData, {merge: true});
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

	private buildUserDataFromAuthService(user:any, lastname:string):any{
		return {
			uid: user.uid,
			email: user.email,
			displayName: lastname != undefined ?  user.displayName + " " + lastname : user.displayName,
			photoURL: user.photoURL !== null ? user.photoURL : this.defaultPhotoUrl,
		}	
	}

	private saveLocalUserData(userData:any): void {
		window.localStorage.setItem('userData', JSON.stringify(userData));
	}

	private getLocalUserData():void{
		this.userData = JSON.parse(window.localStorage.getItem('userData'));
	}

	public async handleVerifyEmail(actionCode:string): Promise<void>{
		return this.afAuth.auth.applyActionCode(actionCode).then();
	}

	public verifyPasswordReset(actionCode: string): Promise<string>{
		return this.afAuth.auth.verifyPasswordResetCode(actionCode);
	}

	public confirmPasswordReset(actionCode:string, newPassword: string): Promise <void>{
		return this.afAuth.auth.confirmPasswordReset(actionCode, newPassword);
	}

	public listenUserData():void{
		this.userSubscription = this.afs.doc<User>(`users/${this.userData.uid}`).valueChanges().subscribe((userData)=>{
			this.userData = userData;
		});
	}

	public stopListenUserUpdates(){
		if (this.userSubscription != null) this.userSubscription.unsubscribe();
	}
	
	  public setFormCompletude(userId:string, data:any):Promise<void>{
		  return this.afs.doc(`users/${userId}`).set(data, {merge:true});
	  } 
}
