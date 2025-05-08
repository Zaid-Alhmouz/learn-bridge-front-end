import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  setRegister(userData: any): Observable<any> {
    return this._HttpClient.post('http://localhost:8080/api/register', userData);
  }

  setLogin(userData: any): Observable<any> {
    const body = new HttpParams()
      .set('username', userData.email)
      .set('password', userData.password);

    return this._HttpClient.post('http://localhost:8080/api/login', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
      withCredentials: true
    });
  }

  fetchUserData(): Observable<any> {
    return this._HttpClient.get('http://localhost:8080/api/user/current', {
      withCredentials: true
    }).pipe(
      tap((user) => {
        this.userData = user;
      })
    );
  }

  logout() {
    this._HttpClient.post('http://localhost:8080/api/logout', {}, {
      withCredentials: true
    }).subscribe(() => {
      this.userData = null;
      localStorage.removeItem('token');
      this._Router.navigate(['/login']);
    });
  }
}
