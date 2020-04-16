import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all components for which navigation services has been activated
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from "../guard/auth.guard";
import { SecureInnerPagesGuard } from "../guard/secure-inner-pages.guard";
import { RegisterComponent } from 'src/app/components/dashboard/register/register.component';
import { RegisterIndexComponent } from 'src/app/components/dashboard/register-index/register-index.component';
import { TestPersonalComponent } from 'src/app/components/dashboard/test-personal/test-personal.component';
import { TestPsicologicoComponent } from 'src/app/components/dashboard/test-psicologico/test-psicologico.component';
import { TestBiblicoComponent } from 'src/app/components/dashboard/test-biblico/test-biblico.component';
import { AgreementComponent } from 'src/app/components/dashboard/agreement/agreement.component';
import { UsermgmtComponent } from 'src/app/components/usermgmt/usermgmt.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';


const routes: Routes = [
	{ path: '', redirectTo: '/sign-in', pathMatch: 'full' },
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'register-user', component: SignUpComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: 'dashboard', component: DashboardComponent, children: [
		{
			path:'', component: RegisterIndexComponent
		},
		{
			path:'enrollment', component: RegisterComponent
		},
		{
			path:'personal-test', component: TestPersonalComponent
		},
		{
			path:'psychological-test', component: TestPsicologicoComponent
		},
		{
			path:'biblical-test', component: TestBiblicoComponent
		},
		{
			path:'agreement', component: AgreementComponent
		},
	] },
	{ path: 'usermgmt', component:UsermgmtComponent },
	{ path: 'forgot-password', component:ForgotPasswordComponent },
	{ path: 'verify-email-address', component:VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
