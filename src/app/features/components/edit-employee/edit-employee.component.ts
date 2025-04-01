import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
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
      departmentId: ['']
    });
  }

  ngOnInit(): void {
    // You can initialize form values here if needed
  }

  isInvalid(controlName: string): boolean {
    const control = this.employeeForm.get(controlName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log('Form submitted:', this.employeeForm.value);
      // Handle form submission logic here
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

}
