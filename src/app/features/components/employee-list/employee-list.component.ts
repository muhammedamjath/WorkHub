import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeatureService } from '../../featureService.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/auth/authService.service';
import { environment } from '../../../../environment/environment';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  designationName: string;
  departmentName: string;
  joiningOn: string;
  officeEmailId: string;
  officeContactNo: string;
  employeeCode: string;
  profilePhotoName: string;
  bg: string;
  relievingOn: string;
  confirmationOn: string;
  resignationOn: string;
  designationId: string;
  reportingToId: string;
  departmentId: string;
}


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule , RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  constructor (
    private featurservice : FeatureService,
    private authService : AuthService,
    private route : Router
  ){}

  openDropdownId : string | null = null;
  pageSize : number = 10;
  pageIndex : number = 0;
  searchKeyword : string = '';
  employees! : [Employee];
  baseUrl : string = '';
  api : string = '/Employee/GetEmployeeProfilePhoto';
  token : string = '';
  employeesCount : number = 0;

  ngOnInit(): void {
    this.baseUrl = environment.baseUrl;
    

    this.loadEmployees();
  }

  loadEmployees() {
    const data = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      searchKeyword: this.searchKeyword
    };
  
    this.featurservice.getAllEmployees(data).subscribe(
      (response) => {
        this.employees = response.data.result;
        this.employeesCount = response.data.count;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  getProfileImage(profilePhotoName: string): any {
    
    return  `${environment.baseUrl}/Employee/GetEmployeeProfilePhoto?photoName=${profilePhotoName}&token=${this.token}`;
    
  }
  getPages(): number[] {
    const totalPages = Math.ceil(this.employeesCount / this.pageSize);
    return new Array(totalPages).fill(0);
  }

  searchEmployees() {
    this.pageIndex = 0;
    this.loadEmployees();
  }

  previousPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.loadEmployees();
    }
  }

  nextPage() {
    if ((this.pageIndex + 1) * this.pageSize < this.employeesCount) {
      this.pageIndex++;
      this.loadEmployees();
    }
  }

  goToPage(index: number) {
    this.pageIndex = index;
    this.loadEmployees();
  }

  letter (name : string){
    return name?.charAt(0);
  }

  toggleDropdown(employeeId : string) {
    this.openDropdownId = this.openDropdownId === employeeId ? null : employeeId;
  }

  updateEmployee(id: string){
    this.route.navigate(['/user/updateemployee/',id]);
  }

  add(){
    this.route.navigate(['/user/addemployeee'])
  }
}
