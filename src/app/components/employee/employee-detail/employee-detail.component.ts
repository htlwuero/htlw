import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../../services/data.service";
import {Employee} from "../../../../models/employee";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employeeId: number | undefined;
  employee: Employee | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private dataService: DataService) {
    this.employeeId = +activatedRoute.snapshot.params.id;

    dataService.getEmployee(this.employeeId)
      .subscribe(employee => {
        this.employee = employee;
        console.log(this.employee);
        }
      )
    console.log(this.employeeId);
  }

  ngOnInit(): void {
  }

}
