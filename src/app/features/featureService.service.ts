import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })

  export class FeatureService {
  constructor(private http:HttpClient) { }

    baseUrl = environment.baseUrl

    companyDetails(id: any):Observable<any>{
        return this.http.post(`${this.baseUrl}/Company/GetCompanyById`,{id:id});
      }
    
      GetAllCurrency(data: object):Observable<any>{
        return this.http.post(`${this.baseUrl}/Company/GetAllCurrency`,data);
      }

      updateCompany(data: object):Observable<any>{
        return this.http.post(`${this.baseUrl}/Company/UpdateCompany`,data);
      }

      updateComponyLogo(data:any):Observable<any>{
        return this.http.post(`${this.baseUrl}/Company/UploadCompanyLogo`,data)
      }
    
      removeComponyLogo(id:any):Observable<any>{
        return this.http.post(`${this.baseUrl}/Company/RemoveCompanyLogo`,{id:id})
      }

      getAllEmployees(data:object):Observable<any>{
        return this.http.post(`${this.baseUrl}/Employee/GetAllEmployees`,data)
      }

      createEmployee(data: object):Observable<any>{
        return this.http.post(`${this.baseUrl}/Employee/CreateEmployee`,data);
      }

      employeeDetails(id: any):Observable<any>{
        return this.http.post(`${this.baseUrl}/Employee/GetEmployeeById`,{id:id})
      }

      GetAllDepartments(data: object):Observable<any>{
        return this.http.post(`${this.baseUrl}/Department/GetAllDepartments`,data);
      }
    
      GetAllDesignations(data: object):Observable<any>{
        return this.http.post(`${this.baseUrl}/Designation/GetAllDesignations`,data);
      }

      updateEmployee(data: object):Observable<any>{
        return this.http.post(`${this.baseUrl}/Employee/UpdateEmployee`,data);
      }

      updateProfile(data:any):Observable<any>{
        return this.http.post(`${this.baseUrl}/Employee/UploadEmployeeProfilePhoto`,data)
      }
    
      removeProfile(id:any):Observable<any>{
        return this.http.post(`${this.baseUrl}/Employee/RemoveEmployeeProfilePhoto`,{id:id})
      }

     
  }