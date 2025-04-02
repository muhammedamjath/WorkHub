import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';


export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'user',loadChildren:()=> import('./features/featureRoutes.routes').then((m)=> m.FeaturesRoutes)}
];
