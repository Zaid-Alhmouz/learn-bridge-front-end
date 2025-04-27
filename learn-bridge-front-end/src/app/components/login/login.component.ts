import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginSubmitted = false;
  errorMessage: string = '';
  isLoading = false;

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this._FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get lf() {
    return this.loginForm.controls;
  }

  // Helper methods to check field validity
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    if (field != null)
      return (field.invalid && (field.dirty || field.touched || this.loginSubmitted));
    return false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field != null)
      if (fieldName === 'email') {
        if (field.errors?.['required']) {
          return 'Email is required';
        }
        if (field.errors?.['email']) {
          return 'Please enter a valid email address';
        }
      }
    if (field != null)
      if (fieldName === 'password') {
        if (field.errors?.['required']) {
          return 'Password is required';
        }
        if (field.errors?.['minlength']) {
          return 'Password must be at least 6 characters';
        }
      }

    return '';
  }

  // onLoginSubmit() {
  //   this.loginSubmitted = true;

  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this.isLoading = true;
  //   this.errorMessage = '';

  //   this._AuthService.setLogin(this.loginForm.value).subscribe({
  //     next: (response) => {
  //       this.isLoading = false;
  //       this._Router.navigate(['/blank/home']);
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.errorMessage =
  //         error.error.message || 'Login failed. Please check your credentials.';
  //       this.isLoading = false;
  //     },
  //   });
  // }


  onLoginSubmit() {
    this.loginSubmitted = true;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    this.isLoading = true;
    this.errorMessage = '';
  
    this._AuthService.setLogin(this.loginForm.value).subscribe({
      next: (token: any) => {
        this.isLoading = false;
        
        localStorage.setItem('eToken', token);  
        this._AuthService.decodeUserData();    
        
        const userRole = this._AuthService.userData?.role;  
  
        if (userRole === 'INSTRUCTOR') {
          this._Router.navigate(['/instructor/home']);
        } else if (userRole === 'LEARNER') {
          this._Router.navigate(['/learner']);
        } else {
          this._Router.navigate(['/login']); 
        }
      },
      error: (error: any) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        this.isLoading = false;
      }
    });
  }
  

  onForgotPassword() {
    this._Router.navigate(['/forgot-password']);
  }
}