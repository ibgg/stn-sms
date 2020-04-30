import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './shared/routing/app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

import { AuthService } from './shared/services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EnrollmentTestComponent } from './components/dashboard/enrollment-test/enrollment-test.component';
import { TestPersonalComponent } from './components/dashboard/test-personal/test-personal.component';
import { TestPsicologicoComponent } from './components/dashboard/test-psicologico/test-psicologico.component';
import { TestBiblicoComponent } from './components/dashboard/test-biblico/test-biblico.component';
import { TestsListComponent } from './components/dashboard/tests-list/tests-list.component';
import { AgreementComponent } from './components/dashboard/agreement/agreement.component';
import { UsermgmtComponent } from './components/usermgmt/usermgmt.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentsListComponent } from './components/admin/students-list/students-list.component';
import { EnrollmentReportComponent } from './components/admin/enrollment-report/enrollment-report.component';
import { PersonalTestReportComponent } from './components/admin/personal-test-report/personal-test-report.component';
import { PsychoTestReportComponent } from './components/admin/psycho-test-report/psycho-test-report.component';
import { BiblicalTestReportComponent } from './components/admin/biblical-test-report/biblical-test-report.component';
import { AgreementReportComponent } from './components/admin/agreement-report/agreement-report.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
	ForgotPasswordComponent,
	VerifyEmailComponent,
	EnrollmentTestComponent,
	TestPersonalComponent,
	TestPsicologicoComponent,
	TestBiblicoComponent,
	TestsListComponent,
	AgreementComponent,
	UsermgmtComponent,
	AdminComponent,
	StudentsListComponent,
	EnrollmentReportComponent,
	PersonalTestReportComponent,
	PsychoTestReportComponent,
	BiblicalTestReportComponent,
	AgreementReportComponent,
],
  imports: [
	BrowserModule,
	FontAwesomeModule,
	AppRoutingModule,
	AngularFireModule.initializeApp(environment.firebaseConfig),
	AngularFireAuthModule,
	AngularFirestoreModule,
	BrowserAnimationsModule,
	MatCheckboxModule,
	MatFormFieldModule,
	TextFieldModule,
	MatRadioModule,
	MatInputModule,
	MatSelectModule,
	CdkStepperModule,
	MatButtonModule,
	FormsModule,
	ReactiveFormsModule,
	MatStepperModule,
	MatSliderModule,
	MatSidenavModule,
	MatToolbarModule,
	MatMenuModule,
	MatListModule,
	MatIconModule,
	MatDividerModule,
	A11yModule,
	ClipboardModule,
	DragDropModule,
	PortalModule,
	ScrollingModule,
	CdkTableModule,
	CdkTreeModule,
	MatAutocompleteModule,
	MatBadgeModule,
	MatBottomSheetModule,
	MatButtonToggleModule,
	MatCardModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatExpansionModule,
	MatGridListModule,
	MatNativeDateModule,
	MatRippleModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatSlideToggleModule,
	MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatTreeModule,
	MatTabsModule,
	MatTooltipModule,
	NgCircleProgressModule.forRoot({})
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]

})
export class AppModule { 
	constructor(library: FaIconLibrary) {
		// Add an icon to the library for convenient access in other components
		library.addIconPacks(fas, fab);
	  }
}
