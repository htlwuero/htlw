import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "../models/employee";
import {Department} from "../models/department";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient : HttpClient) { }

  public getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('https://htlw-resman-backend.herokuapp.com/employees');
  }

  public getAllDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>('http://localhost:8080/departments');
  }


}
