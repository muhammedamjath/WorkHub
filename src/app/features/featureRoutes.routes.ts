import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ComponyDetailesComponent } from "./components/compony-detailes/compony-detailes.component";
import { UpdateComponyComponent } from "./components/update-compony/update-compony.component";

export const FeaturesRoutes: Routes = [
    { path: '', component: HomeComponent,
        children: [
            { path: '', redirectTo: 'dashbord', pathMatch: 'full' },  
            { path: 'dashbord', component: ComponyDetailesComponent },
            {path:'updateCompony',component:UpdateComponyComponent}
        ]
    }
];
