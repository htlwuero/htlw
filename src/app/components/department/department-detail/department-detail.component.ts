import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../../services/data.service";
import {Department} from "../../../../models/department";
import {Employee} from "../../../../models/employee";
import {forkJoin, Observable} from "rxjs";

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
  department: Department | undefined;
  employees: Employee[] = [];
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = ['employeeId', 'firstName', 'lastName'];
  dataSource = ELEMENT_DATA;

  constructor(private activatedRoute: ActivatedRoute,
              private dataService: DataService) {
    this.#departmentId = +activatedRoute.snapshot.params.id;
    console.log(this.#departmentId);

    const data$: Observable<any>[] = [
      dataService.getDepartment(this.#departmentId),
      dataService.getEmployeesByDepartment(this.#departmentId)
    ]

    forkJoin(data$)
      .subscribe(responseData => {
        this.department = responseData[0];
        this.employees = responseData[1];
        console.log(this.department);
        console.log(this.employees);
      });
  }

  ngOnInit(): void {
  }


}
