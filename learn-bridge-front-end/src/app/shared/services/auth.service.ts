// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(private _HttpClient: HttpClient) { }

//   setRegister(userData: object): Observable<any> {
//     return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData);
//   }

//   setLogin(userData: object): Observable<any> {
//     return this._HttpClient.get('https://route-ecommerce.vercel.app/api/v1/auth/signin', userData);
//   }
// }


// *********************************************************************************************


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Mock user storage (simulating a database)
  private users: any[] = [];
  userData:any;
  // Flag to track login status
  private isLoggedIn = false;

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }


  // decodeUserData(){
  //   if(localStorage.getItem("eToken") != null){
  //     let encodeToken:any = localStorage.getItem("eToken");

  //     let decodeToken = jwtDecode(encodeToken);

  //     this.userData = decodeToken;
  //   }
  // }

  // Mock registration method (unchanged from previous version)
  setRegister(userData: any): Observable<any> {
    const existingUser = this.users.find(user => user.email === userData.email);

    if (existingUser) {
      return throwError(() => ({
        error: { message: 'Email already exists' }
      }));
    }

    this.users.push(userData);

    return of({ success: true, message: 'Registration successful' }).pipe(
      delay(1000)
    );
  }

  // Mock login method with success detection
  setLogin(credentials: any): Observable<any> {
    const user = this.users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      // Set login status to true
      this.isLoggedIn = true;

      return of({
        success: true,
        user,
        message: 'Login successful'
      });
    } else {
      // Reset login status
      this.isLoggedIn = false;

      return throwError(() => ({
        error: { message: 'Invalid email or password' }
      }));
    }
  }

  // Method to check login status
  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  // Method to logout
  logout() {
    this.isLoggedIn = false;
    // localStorage.removeItem("eToken");
    this._Router.navigate(['/login']);

  }
}