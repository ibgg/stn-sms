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
	private columnsNames: string[] = ['displayName', 'email', 'creationLocaleDate', 'emailVerified', 'enrollmentCompleteness', 'personalTestCompleteness', 'psychologicalTestCompleteness', 'biblicalTestCompleteness', 'agreementCompleteness', 'completeness'];
	private dataSource: MatTableDataSource<any>;
	private bkDataSource: MatTableDataSource<any>;
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
				studentsData.filter((element) => element['role'] == undefined ||  element.role != "admin").forEach((element) => {
					let progress = 0;
					element.emailVerified = element['emailVerified'] != undefined && element.emailVerified ? VERIFIED_EMAIL : NON_VERIFIED_EMAIL;
					progress += element['agreementCompleteness'] != undefined && element['agreementCompleteness'] == true ? 100 : 0;
					progress += element['enrollmentCompleteness'] != undefined ? element.enrollmentCompleteness : 0;
					progress += element['personalTestCompleteness'] != undefined ? element.personalTestCompleteness : 0;
					progress += element['biblicalTestCompleteness'] != undefined ? element.biblicalTestCompleteness : 0;
					progress += element['psychologicalTestCompleteness'] != undefined ? element.psychologicalTestCompleteness : 0;
					element.completeness = (progress / 5).toFixed(2) + '%';
	
					if (element['creationDate'] != undefined && element['creationDate'] != null){
						let creationDate = element['creationDate'].toDate();
						let _creationDate = creationDate.toLocaleDateString('es-MX');
						element.creationLocaleDate = _creationDate;
						element.creationDate = element['creationDate'].toDate(); 
					}
					element.enrollmentCompleteness = element['enrollmentCompleteness'] != undefined ? element.enrollmentCompleteness.toFixed(1) : 0;
					element.personalTestCompleteness = element['personalTestCompleteness'] != undefined ? element.personalTestCompleteness.toFixed(1) : 0;
					element.psychologicalTestCompleteness = element['psychologicalTestCompleteness'] != undefined ? element.psychologicalTestCompleteness.toFixed(1) : 0;
					element.biblicalTestCompleteness = element['biblicalTestCompleteness'] != undefined ? element.biblicalTestCompleteness.toFixed(1) : 0;
	
					element.agreementCompleteness = element['agreementCompleteness'] != undefined && element.agreementCompleteness ? 'Sí' : 'No';
					
					students.push(element);
				})
	
				this.dataSource = new MatTableDataSource(students);
				this.bkDataSource = new MatTableDataSource(students);
				observer.next();
				observer.complete();
			});
		});

	}

	private applyFilter(nameFilter: string, startDateFilter: string, endDateFilter: string) {
		let dtStartDateFilter = startDateFilter != null && startDateFilter != undefined && startDateFilter != '' ? new Date(startDateFilter) : null;
		let dtEndDateFilter = endDateFilter != null && endDateFilter != undefined && endDateFilter != '' ? new Date(endDateFilter): null;
		nameFilter = nameFilter.trim();
		nameFilter = nameFilter.toLowerCase();
		this.dataSource = new MatTableDataSource (this.bkDataSource.data);
		this.dataSource.data = this.dataSource.data.filter(function (e){
			let displayName = (e.displayName + '').toLowerCase();
			if (startDateFilter && endDateFilter)
				return displayName.includes(nameFilter) && (e.creationDate > dtStartDateFilter && e.creationDate < dtEndDateFilter);
			else if (startDateFilter)
				return displayName.includes(nameFilter) && e.creationDate > dtStartDateFilter;
			else if (endDateFilter)
				return displayName.includes(nameFilter) && e.creationDate < dtEndDateFilter;
			else if (nameFilter)
				return displayName.includes(nameFilter);
			return true;
		});
	  }
	
	private filterPeriod(data: any, filter: string) {
		//return data.referenceDate > startDateFilter.value() && data.referenceDate < endDateFilter.value();
	}
}
