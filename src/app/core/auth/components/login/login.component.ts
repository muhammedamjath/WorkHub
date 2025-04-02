import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../authService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm: FormGroup;
  error: string = '';

  constructor(private fb: FormBuilder , private authService: AuthService,private router:Router,) {
    this.loginForm = this.fb.group({
      username: ['admin@rideware.com', Validators.required],
      clientId: ['ERPWebApp', [Validators.required]],
      password: ['1234', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({

        next:(res)=>{
          
          if(res.isValid===false){
            this.error = res.errorMessages[0];
            setTimeout(() => {
              this.error = '';
            }, 3000);
          }else{
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('companyId', res.data.companyId);
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('firstName', res.data.firstName);
            localStorage.setItem('employeeId', res.data.employeeId);
            this.router.navigate(['/user'])
          }
        },
        error:(err)=>{
          console.log('this is from login:',err);
          
        }
      })
    } else {
      this.error = 'Please provide correct data'
            setTimeout(() => {
              this.error = '';
            }, 3000);
    }
  }

}
