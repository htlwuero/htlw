export interface Department {
  departmentId:number;
  department:string;
  persons?:	DepartmentPersonRelation[];
}

export interface DepartmentPersonRelation {
  departmentKey:	number;
  personKey:number;
  validFrom:string;
  validUntil:	string;
}
