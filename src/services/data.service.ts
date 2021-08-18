import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Employee} from "../models/employee";
import {Department} from "../models/department";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private departmentTestData: Department[] = [{
    departmentId:1,
    department:'Abteilung 1'
  },{
    departmentId:2,
    department:'Abteilung 2'
  }];

  private employeeTestData: Employee[] = [
    {
      employeeId: 1,
      firstName: "test1",
      lastName: "test1.2",
      birthDate: new Date("1111-01-09"),
      entryDate: new Date("1111-01-09"),
      exitDate: new Date("1111-01-09"),
      genderId: 1
    },
    {
      employeeId: 2,
      firstName: "tim",
      lastName: "test2",
      birthDate: new Date("2000-01-02"),
      entryDate: new Date("1111-01-09"),
      exitDate: new Date("1111-01-09"),
      genderId: 1
    },
    {
      employeeId: 3,
      firstName: "tom",
      lastName: "test2",
      birthDate: new Date("2000-01-02"),
      entryDate: new Date("1111-01-09"),
      exitDate: new Date("1111-01-09"),
      genderId: 1
    }
  ];

  constructor(private httpClient : HttpClient) { }

  public getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('https://htlw-resman-backend.herokuapp.com/employees');
  }

  public getAllDepartments(): Observable<Department[]> {
    return of(this.departmentTestData);
    //return this.httpClient.get<Department[]>('http://localhost:8080/departments');
  }

  public getDepartment(departmentId: number): Observable<Department | undefined> {
    const foundDepartment = this.departmentTestData.find(testData => testData.departmentId === departmentId)
    return of(foundDepartment);
  }

  public getEmployeesByDepartment(departmentId: number): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('http://localhost:8080/employees?departmentId='+departmentId);
  }
}
