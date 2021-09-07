import {Component, OnInit} from '@angular/core';
import {DataService} from "../../../../services/data.service";
import {Department} from "../../../../models/department";
import {Router} from "@angular/router";
import {Image} from "../../../../models/image";
import {RatingEnum} from "../../../../enums/rating-enum";

@Component({
  selector: 'app-department-overview',
  templateUrl: './department-overview.component.html',
  styleUrls: ['./department-overview.component.scss']
})
export class DepartmentOverviewComponent implements OnInit {
  departments: Department[]=[];
  departmentImages: ({departmentId: number; image: Image | undefined} )[]=[];
  bulbClassBasis: string = "department-overview__department-traffic-light__bulb";

  ratings: string[] = ['red', 'orange', 'green'];


  constructor(private dataService: DataService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.dataService.getAllDepartments().subscribe(departments => {
      console.log(departments);
      this.departments = departments.map(department =>
        ({ ...department, departmentRating: this.ratings[Math.floor(Math.random() * this.ratings.length)]})
      );
      //this.departments.forEach(department => { department.departmentRating = 'green'});
      this.dataService.getDepartmentImages(this.departments).subscribe(images=>{
        console.log(images) ;
        this.departmentImages = images;
      })
    })
  }

  departmentClick(department: Department): void {
    console.log(`department: ${department.departmentId}`);
    this.router.navigate([`department/detail/${department.departmentId}`]);
  }
    getDepartmentImage(department: Department):Image | undefined {
    return  this.departmentImages.find(image=>image.departmentId===department.departmentId)?.image;
    }

  getBulbClass(color: string, department: Department)  {
    let bulbClassObject = {
      'department-overview__department-traffic-light__bulb' : true,
      'green': false,
      'orange': false,
      'red': false
    };

    bulbClassObject.green = department.departmentRating === RatingEnum.GREEN && color === RatingEnum.GREEN ? true : false;
    bulbClassObject.orange = department.departmentRating === RatingEnum.ORANGE  && color === RatingEnum.ORANGE ? true : false;
    bulbClassObject.red = department.departmentRating === RatingEnum.RED &&  color === RatingEnum.RED ? true : false;

    return bulbClassObject;
  }
}
