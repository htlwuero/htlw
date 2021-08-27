import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../../services/data.service";
import {Employee} from "../../../../models/employee";
import {Image} from "../../../../models/image";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employeeId: number | undefined;
  employee: Employee | undefined;
  employeeImage: Image | undefined;

  constructor(private activatedRoute: ActivatedRoute,
              private dataService: DataService) {
    this.employeeId = +activatedRoute.snapshot.params.id;

    dataService.getEmployee(this.employeeId)
      .subscribe(employee => {
        this.employee = employee;
        console.log(this.employee);
        const image = employee.imageEmployeeRelations?.filter(image=>{
          return new Date(  image.validFrom) <= new Date()  && new Date( image.validTo ) >= new Date();
        });
        if (!!image && image.length>0){
          dataService.getImageById(image[0].imageId).subscribe(image=>{
            this.employeeImage = image;
            console.log(this.employeeImage);
          })
        }
        }
      )
    console.log(this.employeeId);
  }

  ngOnInit(): void {
  }

}
