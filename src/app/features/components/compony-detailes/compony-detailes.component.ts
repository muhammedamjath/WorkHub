import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureService } from '../../featureService.service';

interface Company {
  name: string;
  shortName: string;
  vatNo: string;
  crNo: string;
  addressLine1: string;
  addressLine2?: string; 
  zipCode: string;
  emailId: string;
  phoneNo1: string;
  phoneNo2?: string; 
  currency: string;
  currencyId: number,
  logo: string;
}

@Component({
  selector: 'app-compony-detailes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './compony-detailes.component.html',
  styleUrl: './compony-detailes.component.css'
})
export class ComponyDetailesComponent implements OnInit {

  constructor(private router:Router , private featureService:FeatureService){}
  company:Company = {
    name: '',
    shortName: '',
    vatNo: '',
    crNo: '',
    addressLine1: '',
    addressLine2: '',
    zipCode: '',
    emailId: '',
    phoneNo1: '',
    phoneNo2: '',
    logo: '',
    currencyId: 0,
    currency: ''
  };
 ngOnInit(): void {
   const companyId = localStorage.getItem('companyId')
   console.log('this is id',companyId);
   
   this.featureService.companyDetails(companyId).subscribe({
    next:(res)=>{
      this.company = res.data

      const data = {
        "searchKeyword": "",
        "pageIndex": 0,
        "pageSize": 0
      };
      
      this.featureService.GetAllCurrency(data).subscribe(
        (response)=>{
          if (response?.data?.result) {
            const matchedCurrency = response.data.result.find(
              (currency: any) => currency.id === this.company.currencyId
            );
    
            if (matchedCurrency) {
              this.company.currency = matchedCurrency.name;
            }
          }
        },
        (error)=>{
          console.log(error);
        }
      )
    },error:(err)=>{
      console.log('this is from compny err:',err);
      
    }
   })
 }
  onUpdate() {
    this.router.navigate(['/user/updateCompony'])
  }
}
