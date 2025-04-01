import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/components/login/login.component';
import { ComponyDetailesComponent } from './features/components/compony-detailes/compony-detailes.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

export const routes: Routes = [
    {path:'',component:SidebarComponent}
];
