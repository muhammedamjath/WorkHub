import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FeatureService } from '../../featureService.service';
import { environment } from '../../../../environment/environment';
import Swal from 'sweetalert2';


interface Designation {
  id: string;
  name: string;
  description: string;
}

interface Department {
  id: string;
  name: string;
}

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
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css',
})
export class EditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  allDesignations: Designation[] = [];
  allDepartments: Department[] = [];
  selectedDesignation!: Designation;
  selectedDepartment!: Department;
  employeeData: Employee | null = null;
  errorMessage:string = ''
  successMessage:string = ''
  profileImage: string | null = null; 
  userId:string = ''


  constructor(
    private fb: FormBuilder,
    private ar: ActivatedRoute,
    private featureService: FeatureService
  ) {
    this.employeeForm = this.fb.group({
      id: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      officeEmailId: ['', [Validators.required, Validators.email]],
      officeContactNo: ['', Validators.required],
      joiningOn: ['', Validators.required],
      relievingOn: [''],
      confirmationOn: [''],
      resignationOn: [''],
      designationId: [''],
      reportingToId: [''],
      departmentId: [''],
    });
  }

  ngOnInit(): void {
    this.ar.params.subscribe((params) => {
      if (params['id']) {
        this.userId = params['id'];
        this.loadUserData()
      }
    });
  }

  data = {
    searchKeyword: '',
    pageIndex: 0,
    pageSize: 0,
  };

  loadUserData(){
    if (this.userId) {
      this.featureService.employeeDetails(this.userId).subscribe({
        next: (res) => {
          
          if (res.data) {
            const token = localStorage.getItem('token')
            this.employeeData = res.data;
            this.employeeForm.patchValue(res.data);
            this.profileImage = `${environment.baseUrl}/Employee/GetEmployeeProfilePhoto?photoName=${this.employeeData?.profilePhotoName}&token=${token}`;
            this.getAllDesignations();
            this.getAllDepartments();
          }
        },
        error: (err) => {
          console.log('Error fetching employee details:', err);
        },
      });
    }
  }
  getAllDesignations() {
    this.featureService.GetAllDesignations(this.data).subscribe({
      next: (response) => {
        if (response?.data?.result) {
          this.allDesignations = response.data.result;
          if (this.employeeData) {
            this.selectedDesignation = this.allDesignations.find(
              (designation) => designation.id === this.employeeData?.designationId
            ) || ({} as Designation);
          }
        }
      },
      error: (error) => {
        console.log('Error fetching designations:', error);
      },
    });
  }

  getAllDepartments() {
    this.featureService.GetAllDepartments(this.data).subscribe({
      next: (response) => {
        if (response?.data?.result) {
          this.allDepartments = response.data.result;
          if (this.employeeData) {
            this.selectedDepartment = this.allDepartments.find(
              (department) => department.id === this.employeeData?.departmentId
            ) || ({} as Department);
          }
        }
      },
      error: (error) => {
        console.log('Error fetching departments:', error);
      },
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.employeeForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }


  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      
      this.featureService.updateEmployee(this.employeeForm.value).subscribe({
        next: (res) => {
          console.log(res);
          
          if (res?.successMessages) {
            this.successMessage = res.successMessages; 
          } else {
            this.successMessage = 'Employee updated successfully!';
          }
  
          this.errorMessage = ''; 
  
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        error: (err) => {
          console.log(err);
          
          if (err?.error?.errorMessages) {
            this.errorMessage = err.error.errorMessages;
          } else {
            this.errorMessage = 'Something went wrong. Please try again.';
          }
  
          this.successMessage = ''; 
  
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
  

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
  
      const data = new FormData();
      data.append('Photo', file); 
      if (this.employeeData?.id) {
        data.append('Id', this.employeeData.id);
      }
  
      this.featureService.updateProfile(data).subscribe({
        next: (res) => {
          const token = localStorage.getItem('token')
          this.loadUserData()
          this.profileImage = `${environment.baseUrl}/Employee/GetEmployeeProfilePhoto?photoName=${this.employeeData?.profilePhotoName}&token=${token}`;
          console.log('Profile updated successfully', res);
        },
        error: (err) => {
          console.error('Error updating profile', err);
        }
      });
    }
  }
  

  deleteImage() {
    if (!this.employeeData?.id) {
      Swal.fire('Error', 'Employee ID not found!', 'error');
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this image?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.featureService.removeProfile(this.employeeData?.id).subscribe({
          next: (res) => {
            this.profileImage = null;
            Swal.fire('Deleted!', 'Your profile image has been deleted.', 'success');
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error!', 'Failed to delete the image.', 'error');
          }
        });
      }
    });
  }

}

  

