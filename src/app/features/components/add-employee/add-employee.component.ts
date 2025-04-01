import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: [''],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      parmenantAddress: ['', [Validators.required]],
      currentAddress: ['', [Validators.required]],
      isCurrentSameAsParmenantAddress: [true],
      personalEmailId: ['', [Validators.required, Validators.email]],
      personalMobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      otherContactNo: [''],
      employeeCode: ['', [Validators.required]],
      joiningOn: ['', [Validators.required]]
    });
    
    // Set initial state of current address validation based on checkbox
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
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.employeeForm.controls).forEach(key => {
        const control = this.employeeForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    // Handle the same address logic before submitting
    if (this.employeeForm.get('isCurrentSameAsParmenantAddress')?.value) {
      this.employeeForm.get('currentAddress')?.setValue(
        this.employeeForm.get('parmenantAddress')?.value
      );
    }
    
    // Form is valid, get values and submit
    const formData = this.employeeForm.getRawValue();
    console.log('Form submitted with data:', formData);
    
    // Here you would call your service to submit the data
    // this.employeeService.createEmployee(formData).subscribe(...);
  }
}
