import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { StudentsDataService } from 'src/app/shared/services/db/students-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { Observable } from 'rxjs';

interface StudentsColumns{
	name:string;
	label:string
}

const VERIFIED_EMAIL = 'Verificado';
const NON_VERIFIED_EMAIL = 'Pendiente de verificar';
const ITEMS_PER_PAGE_LABEL = 'Estudiantes a mostrar';

 
@Component({
	selector: 'app-students-list',
	templateUrl: './students-list.component.html',
	styleUrls: ['./students-list.component.css'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	]
})
export class StudentsListComponent implements AfterViewInit {	
	private columnsNames: string[] = ['displayName', 'email', 'emailVerified', 'enrollmentCompleteness', 'personalTestCompleteness', 'psychologicalTestCompleteness', 'biblicalTestCompleteness', 'agreementCompleteness', 'completeness'];
	private dataSource: MatTableDataSource<any>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	constructor(private studentsService:StudentsDataService) { 
	}




	ngAfterViewInit(): void {
		this.listenStudentsData().subscribe(()=>{
			this.dataSource.paginator = this.paginator;
			this.dataSource.paginator._intl.itemsPerPageLabel="Estudiantes a mostrar";
			this.dataSource.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => { if (length == 0 || pageSize == 0) { return `0 of ${length}`; } length = Math.max(length, 0); const startIndex = page * pageSize; const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; return `${startIndex + 1} – ${endIndex} de ${length}`; }
		});
	}

	listenStudentsData():Observable<any>{
		return new Observable((observer) => {
			this.studentsService.listenUserData().subscribe((studentsData) => {
				let students = [];
				console.log(studentsData);
				studentsData.forEach((element) => {
					let progress = 0;
					element.emailVerified = element['emailVerified'] != undefined && element.emailVerified ? VERIFIED_EMAIL : NON_VERIFIED_EMAIL;
					progress += element['agreementCompleteness'] != undefined && element['agreementCompleteness'] == true ? 100 : 0;
					progress += element['enrollmentCompleteness'] != undefined ? element.enrollmentCompleteness : 0;
					progress += element['personalTestCompleteness'] != undefined ? element.personalTestCompleteness : 0;
					progress += element['biblicalTestCompleteness'] != undefined ? element.biblicalTestCompleteness : 0;
					progress += element['psychologicalTestCompleteness'] != undefined ? element.psychologicalTestCompleteness : 0;
					element.completeness = (progress / 5).toFixed(2) + '%';
	
					element.enrollmentCompleteness = element['enrollmentCompleteness'] != undefined ? element.enrollmentCompleteness.toFixed(1) : 0;
					element.personalTestCompleteness = element['personalTestCompleteness'] != undefined ? element.personalTestCompleteness.toFixed(1) : 0;
					element.psychologicalTestCompleteness = element['psychologicalTestCompleteness'] != undefined ? element.psychologicalTestCompleteness.toFixed(1) : 0;
					element.biblicalTestCompleteness = element['biblicalTestCompleteness'] != undefined ? element.biblicalTestCompleteness.toFixed(1) : 0;
	
					element.agreementCompleteness = element['agreementCompleteness'] != undefined && element.agreementCompleteness ? 'Sí' : 'No';

					console.log(element);
					students.push(element);
				})
	
				this.dataSource = new MatTableDataSource(students);
				observer.next();
				observer.complete();
			});
		});

	}

	private applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	  }
	
}
