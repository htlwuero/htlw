import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../../../services/data.service";
import {Department} from "../../../../models/department";
import {Employee} from "../../../../models/employee";
import {forkJoin, Observable} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})

export class DepartmentDetailComponent implements OnInit {

  #departmentId: number;
  #paginator: MatPaginator | undefined;
  #dataSource: MatTableDataSource<Employee> | undefined;
  department: Department | undefined;
  employees: Employee[] = [];
  displayedColumns: string[] = ['employeeId', 'firstName', 'lastName'];

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator | undefined) {
    this.#paginator = value;
    this.setDataSourcePaginator();
  }

  get paginator(): MatPaginator | undefined {
    return this.#paginator;
  }

  get dataSource(): MatTableDataSource<Employee> | undefined {
    return this.#dataSource;
  }

  set dataSource(value: MatTableDataSource<Employee> | undefined) {
    this.#dataSource = value;
    this.setDataSourcePaginator();
  }

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _dataService: DataService) {
    this.#departmentId = +activatedRoute.snapshot.params.id;
    console.log(this.#departmentId);

    const data$: Observable<any>[] = [
      _dataService.getDepartment(this.#departmentId),
      _dataService.getEmployeesByDepartment(this.#departmentId)
    ]

    forkJoin(data$)
      .subscribe(responseData => {
        this.department = responseData[0];
        this.employees = responseData[1];
        this.dataSource = new MatTableDataSource<Employee>(this.employees);
        console.log(this.department);
        console.log(this.employees);
      });
  }

  setDataSourcePaginator() {
    if(!!this.dataSource) {
      this.dataSource.paginator = (this.paginator as MatPaginator);
    }
  }

  ngOnInit(): void {
  }

  tableRowClick(row: Employee) {
    console.log(row);
    this.router.navigate([`employee/detail/${row.employeeId}`])
  }


}
