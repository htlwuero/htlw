import {Component, OnInit} from '@angular/core';
import {Employee} from "../models/employee";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'htlw';
  employees : Employee[] = [];

  constructor(private dataService:DataService) {

  }

  ngOnInit(): void {
    this.dataService.getAllEmployees().subscribe(
      data => {this.employees = data;
      console.log(data);
      }
    )
  }
}
