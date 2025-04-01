import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
export class ComponyDetailesComponent {

  constructor(private router:Router){}
  company:Company = {
    name: 'Teako Interiors',
    shortName: 'Teako',
    vatNo: 'VAT123456',
    crNo: 'CR987654',
    addressLine1: '123 Green Street',
    addressLine2: 'Suite 456',
    zipCode: '560001',
    emailId: 'contact@teakointeriors.com',
    phoneNo1: '+1234567890',
    phoneNo2: '+0987654321',
    currency: 'USD',
    logo: 'https://via.placeholder.com/80', 
  };

  onUpdate() {
    console.log('Update company clicked');
  }
}
