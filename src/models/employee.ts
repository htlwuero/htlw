export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  entryDate: Date;
  exitDate: Date;
  genderId: number;
  imageEmployeeRelations?: ImageEmployeeRelation[];
}

export interface ImageEmployeeRelation {
  imageId: number;
  employeeKey: number;
  validFrom: Date;
  validTo: Date;
}
