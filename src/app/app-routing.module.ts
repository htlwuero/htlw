import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DepartmentOverviewComponent} from "./components/department/department-overview/department-overview.component";
import {DepartmentDetailComponent} from "./components/department/department-detail/department-detail.component";
import {EmployeeDetailComponent} from "./components/employee/employee-detail/employee-detail.component";

const routes: Routes = [
  {
    path:'department',
    children: [
      {
        path: 'detail/:id',
        component: DepartmentDetailComponent
      }
    ]
  },
  {
    path:'employee',
    children: [
      {
        path: 'detail/:id',
        component: EmployeeDetailComponent
      }
    ]
  },
  {
    path: '**',
    component: DepartmentOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
