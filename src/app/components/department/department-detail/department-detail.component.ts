import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../../services/data.service";
import {Department} from "../../../../models/department";
import {Employee} from "../../../../models/employee";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {

  #departmentId: number;
  department: Department | undefined;
  employees: Employee[] = [];

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
