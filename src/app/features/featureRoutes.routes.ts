import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ComponyDetailesComponent } from "./components/compony-detailes/compony-detailes.component";
import { UpdateComponyComponent } from "./components/update-compony/update-compony.component";
import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { EmployeeListComponent } from "./components/employee-list/employee-list.component";
import { EditEmployeeComponent } from "./components/edit-employee/edit-employee.component";

export const FeaturesRoutes: Routes = [
    { path: '', component: HomeComponent,
        children: [
            { path: '', redirectTo: 'dashbord', pathMatch: 'full' },  
            { path: 'dashbord', component: ComponyDetailesComponent },
            {path:'updateCompony',component:UpdateComponyComponent},
            {path:'addemployeee',component:AddEmployeeComponent},
            {path:'getallemployees',component:EmployeeListComponent},
            {path:'updateemployee/:id',component:EditEmployeeComponent}
        ]
    }
];
