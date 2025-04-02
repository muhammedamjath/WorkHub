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

      updateLogo(data:any):Observable<any>{
        return this.http.post(`${this.baseUrl}/Company/UploadCompanyLogo`,data)
      }
    
      removeLogo(id:any):Observable<any>{
        return this.http.post(`${this.baseUrl}/Company/RemoveCompanyLogo`,{id:id})
      }
  }