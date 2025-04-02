import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Login } from './authModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private route: Router) {}

  baseUrl = environment.baseUrl;

  login(data: Login): Observable<any> {
    return this.http.post(`${this.baseUrl}/User/Login`, data);
  }

  CheckRefreshToken(data: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/User/ValidateRefreshToken`, data);
  }

  logout(){
    localStorage.clear()
    this.route.navigate(['/'])
  }

}
