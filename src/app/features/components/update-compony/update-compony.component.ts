import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FeatureService } from '../../featureService.service';
import { environment } from '../../../../environment/environment';

interface Company {
  id: string;
  name: string;
  shortName: string;
  contactPersonName: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  emailId: string;
  phoneNo1: string;
  phoneNo2: string;
  vatNo: string;
  crNo: string;
  currencyId: number;
  logo:string;
}

interface Currency {
  id: number;
  name: string;
  symbol: string;
}

@Component({
  selector: 'app-update-compony',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-compony.component.html',
  styleUrl: './update-compony.component.css',
})
export class UpdateComponyComponent implements OnInit {
  companyForm!: FormGroup;
  companyData!: Company;
  allCurrency: Currency[] = [];
  selectedCurrency!: Currency;
  companyLogo: string = ''
  successMessage = '';
  errorMessage = '';
  companyId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private featureService: FeatureService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadComponyDetailes();
    
  }

  initForm(): void {
    this.companyForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      shortName: ['', Validators.required],
      contactPersonName: [''],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      zipCode: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNo1: ['', Validators.required],
      phoneNo2: ['', Validators.required],
      vatNo: ['', Validators.required],
      crNo: ['', Validators.required],
      currencyId: [null, Validators.required],
    });
  }

  loadComponyDetailes() {
    const companyId = localStorage.getItem('companyId');

    this.featureService.companyDetails(companyId).subscribe({
      next: (res) => {
        console.log(res);
        
        this.companyData = res.data;
        this.companyForm.patchValue(res.data);
        if(this.companyData?.logo){
          const logoName = this.companyData.logo
          const token = localStorage.getItem('token')

          this.companyLogo = `${environment.baseUrl}/Company/GetCompanyLogo?photoName=${logoName}&token=${token}`
          console.log('logo here', this.companyLogo);

          
        }

        const data = {
          searchKeyword: '',
          pageIndex: 0,
          pageSize: 0,
        };

        this.featureService.GetAllCurrency(data).subscribe(
          (response) => {
            if (response?.data?.result) {
              this.selectedCurrency = response.data.result.find(
                (currency: any) => currency.id === this.companyData.currencyId
              );

              this.allCurrency = response.data.result;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      },
      error: (err) => {
        console.log('this is from compny err:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.companyForm.invalid) {
      this.markFormGroupTouched(this.companyForm);
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.featureService.updateCompany(this.companyForm.value).subscribe({
      next: (res) => {
        this.successMessage = 'Company details updated successfully!';
        this.loadComponyDetailes();
    
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = 'An unexpected error occurred. Please try again.';
    
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
    
  }

  onLogoUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.companyLogo = e.target.result; 
        console.log(this.companyLogo);
        
      };
      reader.readAsDataURL(file);
      
    }
  }

  deleteLogo() {
    
    this.companyLogo = ''; 
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.companyForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
