export interface DepartmentEmployeeRelation {
    departmentEmployeeRelationId: number ;
    departmentKey: number ;
    employeeKey: number ;
    validFrom: Date ;
    validTo: Date ;
}

export interface ImageDepartmentRelation {
     imageId : number ;
    departmentKey: number ;
    validFrom: Date ;
    validTo: Date ;
}

export interface Department {
  departmentId: number;
  department: string;
  persons?: DepartmentPersonRelation[];
  departmentEmployeeRelations?: DepartmentEmployeeRelation[];
  imageDepartmentRelations?: ImageDepartmentRelation[];
  departmentRating?: string;
}

export interface DepartmentPersonRelation {
  departmentKey: number;
  personKey: number;
  validFrom: string;
  validUntil: string;
}

