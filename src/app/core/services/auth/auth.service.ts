import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { forgetPasswordData, logInData, resetCodeData, resetNewPasswordData, signUpData } from '../../../shared/models/data';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  // baseUrl:string = 'https://ecommerce.routemisr.com';

  // userData >> نعملو اما signal او BehaviorSubject الاتنين عادي
  //signal OR behaviourSubject : rxjs , obs
  // userData : any = null;
  // userData : BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null);
userData : WritableSignal<null | JwtPayload> = signal<null | JwtPayload>(null);

_router:Router = inject(Router)

  constructor( private httpClient:HttpClient , @Inject(PLATFORM_ID) private ID : object){

    if(isPlatformBrowser(ID))
     if(localStorage.getItem('userToken') != null){
      this.decodeUserData();
     }

  }

  signUp(data:signUpData):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup` , data)
  }

  logIn(data:logInData):Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin` , data)
  }

  forgetpassword(data:forgetPasswordData):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
  }

  verifyResetCode(data:resetCodeData):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data)
  }

  resetNewPassword(data:resetNewPasswordData):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data)
  }

  decodeUserData(){

  const token = localStorage.getItem('userToken')!;
  const decoded = jwtDecode(token);
  // this.userData = decoded;
  // BehaviorSubject
  // this.userData.next(decoded);
  // signal
  this.userData.set(decoded);
  console.log(this.userData() ,'userData');

  }

  logOut(){
    // 1-remove token from localStorage
    localStorage.removeItem('userToken')
    // 2-userData = null
    this.userData.set(null);
    // 3-navigate login page
    this._router.navigate(['login']);
  }

}
