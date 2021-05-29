import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  email:string;
  user: any;

  constructor(public authService: AuthService) { 
	this.authService.error = "";

	authService.afAuth.currentUser.then(user => {
		this.email = user.email;
		this.user = user;
		console.log('user: ',this.user);
	}).catch(error => {
		console.log(error);
	});
  }

  ngOnInit(): void {
  }

}
