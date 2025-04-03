import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeatureService } from '../../featureService.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{
  employeeForm!: FormGroup;
  
  constructor(private fb: FormBuilder , private featureService:FeatureService , private router:Router) {}
  
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.employeeForm = this.fb.group({
      firstName:['',[Validators.required]],
      middleName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      birthDate:['',[Validators.required]],
      gender:[null,[Validators.required]],
      parmenantAddress:['',[Validators.required]],
      currentAddress:['',[Validators.required]],
      isCurrentSameAsParmenantAddress:[false,[Validators.required]],
      personalEmailId:['',[Validators.required,Validators.email]],
      personalMobileNo:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      otherContactNo:['',[Validators.required,Validators.pattern(/^\d{10}$/)]],
      employeeCode:['',[Validators.required]],
      joiningOn:[new Date().toISOString(),[Validators.required]]
    });
    
    this.onSameAddressChange();
  }
  
  onSameAddressChange() {
    const sameAddress = this.employeeForm.get('isCurrentSameAsParmenantAddress')?.value;
    const currentAddressControl = this.employeeForm.get('currentAddress');
    
    if (sameAddress) {
      currentAddressControl?.disable();
      currentAddressControl?.setValue(this.employeeForm.get('parmenantAddress')?.value);
    } else {
      currentAddressControl?.enable();
    }
  }
  
  isInvalid(controlName: string): boolean {
    const control = this.employeeForm.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }
  
  onSubmit() {
    if (this.employeeForm.invalid) {
      Object.keys(this.employeeForm.controls).forEach(key => {
        const control = this.employeeForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    if (this.employeeForm.get('isCurrentSameAsParmenantAddress')?.value) {
      this.employeeForm.get('currentAddress')?.setValue(
        this.employeeForm.get('parmenantAddress')?.value
      );
    }

    const formData = this.employeeForm.getRawValue();

    this.featureService.createEmployee(formData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Employee Added!',
          text: 'The employee has been successfully created.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/user/getallemployees']); 
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to create employee. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    });
  }
}
