import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable, of} from "rxjs";
import {Employee} from "../models/employee";
import {Department} from "../models/department";
import {Image} from "../models/image";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private baseUrl = 'https://htlw-resman-backend.herokuapp.com';
  private baseUrl = 'http://localhost:8080';

  private departmentTestData: Department[] = [{
    departmentId: 1,
    department: 'Abteilung 1'
  }, {
    departmentId: 2,
    department: 'Abteilung 2'
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

  constructor(private httpClient: HttpClient) {
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl + '/employees');
  }

  public getEmployee(employeeId: number): Observable<Employee> {
    return this.httpClient.get<Employee>(this.baseUrl + '/employees/' + employeeId);
  }

  public getAllDepartments(): Observable<Department[]> {
    // return of(this.departmentTestData);
    return this.httpClient.get<Department[]>(this.baseUrl + '/departments');
  }

  public getDepartment(departmentId: number): Observable<Department | undefined> {
    return this.httpClient.get<Department>(this.baseUrl + '/departments/' + departmentId);
    //  const foundDepartment = this.departmentTestData.find(testData => testData.departmentId === departmentId)
    //   return of(foundDepartment);
  }

  public getEmployeesByDepartment(departmentId: number): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseUrl + '/employees?departmentId=' + departmentId);
  }

  public getImageById(imageId: number): Observable<Image | undefined> {
    return this.httpClient.get<Image>(this.baseUrl + '/images/' + imageId);
//    return this.httpClient.get<Image>(this.baseUrl + '/images').pipe(
//      switchMap(images=>{
//        return of( images.find(image=>image.imageId===imageId));
//      })
//    );
  }

  public getAllImages(): Observable<Image[]> {
    return this.httpClient.get<Image[]>(this.baseUrl + '/images');
  }
 getDepartmentImages(departments:Department[]): Observable<(Image | undefined)[]>{
  const images = departments.map(department=>{
  const image = department.imageDepartmentRelations?.filter(image=>{
     return new Date(  image.validFrom) <= new Date()  && new Date( image.validTo ) >= new Date();
   });
  return (!!!image || image.length === 0)? undefined: image[0].imageId;
   });
  const data$=images.filter(image=>!!image).map(image=>this.getImageById(image as number));
   return forkJoin(
      data$
    );
 }
}
