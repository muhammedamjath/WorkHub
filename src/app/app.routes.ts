import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { AuthGuard } from './core/auth/authGuard.guard';


export const routes: Routes = [
    {path:'',component:LoginComponent , canActivate:[AuthGuard]},
    {path:'user',loadChildren:()=> import('./features/featureRoutes.routes').then((m)=> m.FeaturesRoutes)}
];
