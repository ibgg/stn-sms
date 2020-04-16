export interface User {
	uid: string;
	email: string;
	displayName: string;
	photoURL: string;
	role:string;
	emailVerified: boolean;
	enrollmentCompleteness:number;
	personalTestCompleteness:number;
	psychologicaltest:number;
	biblicalTest:number;
 }