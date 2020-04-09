import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-usermgmt',
	templateUrl: './usermgmt.component.html',
	styleUrls: ['./usermgmt.component.css']
})
export class UsermgmtComponent implements OnInit {
	private recoverPasswordFG: FormGroup;
	private mode:string;
	private email:string = undefined;
	private actionCode:string;
	private successOperation:string;
	private error: string = undefined;

	constructor(private route:ActivatedRoute, private authService:AuthService, private fb:FormBuilder, private _snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.route.queryParams.subscribe((params: Params) => {
			this.mode = params.mode;
			this.actionCode = params.oobCode;
			
			if (this.mode == 'verifyEmail'){
				this.handleVerifyEmail();
			}else if (this.mode == 'resetPassword'){
				this.verifyPasswordResetCode();
			}
		  });

		this.recoverPasswordFG = this.fb.group({
			password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
		})
	}

	private verifyPasswordResetCode(){
		this.authService.verifyPasswordReset(this.actionCode).then((email) => {
			this.email = email;
		}).catch((error) => {
			this.error = error.message;
		});
	}

	handleResetPassword(password:string): void{
		this.authService.confirmPasswordReset(this.actionCode, password).then((resp) => {
			this.successOperation = "Contraseña actualizada exitosamente";
			this._snackBar.open(this.successOperation, 'Ok',{
				duration: 3000,
			});
			this.recoverPasswordFG.disable();			
		}).catch((error) => {
			this.error = error.message;
		});
	}

	handleVerifyEmail():void {
		this.authService.handleVerifyEmail(this.actionCode).then((resp) => {
			this.successOperation = "Email confirmado exitosamente";
		}).catch((error) => {
			this.error = error.message;
		})
	}

}
