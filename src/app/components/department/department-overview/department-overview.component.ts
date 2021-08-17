import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {Department} from "../../../../models/department";
import {Router} from "@angular/router";

@Component({
  selector: 'app-department-overview',
  templateUrl: './department-overview.component.html',
  styleUrls: ['./department-overview.component.scss']
})
export class DepartmentOverviewComponent implements OnInit {
  departments: Department[]=[];

  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.dataService.getAllDepartments().subscribe(departments => {
      console.log(departments);
      this.departments=departments;
    })

  }

  departmentClick(department: Department): void {
    console.log(`department: ${department.departmentId}`);
    this.router.navigate([`department/detail/${department.departmentId}`]);
  }

}
