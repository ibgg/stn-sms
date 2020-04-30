import { NgModule, Component } from '@angular/core';
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
import { EnrollmentTestComponent } from 'src/app/components/dashboard/enrollment-test/enrollment-test.component';
import { TestsListComponent } from 'src/app/components/dashboard/tests-list/tests-list.component';
import { PersonalTestComponent } from 'src/app/components/dashboard/personal-test/personal-test.component';
import { TestPsicologicoComponent } from 'src/app/components/dashboard/test-psicologico/test-psicologico.component';
import { BiblicalTestComponent } from 'src/app/components/dashboard/biblical-test/biblical-test';
import { AgreementComponent } from 'src/app/components/dashboard/agreement/agreement.component';
import { UsermgmtComponent } from 'src/app/components/usermgmt/usermgmt.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { StudentsListComponent } from 'src/app/components/admin/students-list/students-list.component';
import { EnrollmentReportComponent } from 'src/app/components/admin/enrollment-report/enrollment-report.component';
import { PersonalTestReportComponent } from 'src/app/components/admin/personal-test-report/personal-test-report.component';
import { PsychoTestReportComponent } from 'src/app/components/admin/psycho-test-report/psycho-test-report.component';
import { BiblicalTestReportComponent } from 'src/app/components/admin/biblical-test-report/biblical-test-report.component';
import { AgreementReportComponent } from 'src/app/components/admin/agreement-report/agreement-report.component';


const routes: Routes = [
	{ path: '', redirectTo: '/sign-in', pathMatch: 'full' },
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'register-user', component: SignUpComponent },
	{ path: 'admin', component: AdminComponent, children: [
		{path: '', component:StudentsListComponent}
	] },
	{
		path: 'enrollment-report/:student', component:EnrollmentReportComponent
	},
	{
		path: 'personal-test-report/:student', component:PersonalTestReportComponent
	},
	{
		path: 'psycho-test-report/:student', component:PsychoTestReportComponent
	},
	{
		path: 'biblical-test-report/:student', component:BiblicalTestReportComponent
	},
	{
		path: 'agreement-report/:student', component:AgreementReportComponent
	},
	{ path: 'dashboard', component: DashboardComponent, children: [
		{
			path:'', component: TestsListComponent
		},
		{
			path:'enrollment-test', component: EnrollmentTestComponent
		},
		{
			path:'personal-test', component: PersonalTestComponent
		},
		{
			path:'psychological-test', component: TestPsicologicoComponent
		},
		{
			path:'biblical-test', component: BiblicalTestComponent
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
