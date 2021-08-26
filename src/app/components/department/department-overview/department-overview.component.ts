import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {Department} from "../../../../models/department";
import {Router} from "@angular/router";
import {Image} from "../../../../models/image";

@Component({
  selector: 'app-department-overview',
  templateUrl: './department-overview.component.html',
  styleUrls: ['./department-overview.component.scss']
})
export class DepartmentOverviewComponent implements OnInit {
  departments: Department[]=[];
  image:Image| undefined;
  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.dataService.getAllDepartments().subscribe(departments => {
      console.log(departments);
      this.departments=departments;
      this.dataService.getDepartmentImages(this.departments).subscribe(images=>{
        console.log(images)
      })
    })
    this.dataService.getImageById(2).subscribe(image=>{
      this.image=image;
    })
  }

  departmentClick(department: Department): void {
    console.log(`department: ${department.departmentId}`);
    this.router.navigate([`department/detail/${department.departmentId}`]);
  }

}
