import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/authService.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private AuthService:AuthService){}
  collapsed = false;

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  logout(){
    this.AuthService.logout()
  }
}
