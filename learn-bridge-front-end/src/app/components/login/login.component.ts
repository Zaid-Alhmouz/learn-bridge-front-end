import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
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
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }
   get lf() { return this.loginForm.controls; }

  onLoginSubmit() {
    this.loginSubmitted = true;
    
     if (this.loginForm.invalid) {
      return;
    }
    
     this.isLoading = true;
    this.errorMessage = '';  

    this._AuthService.setLogin(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        
         this._Router.navigate(['/blank/home']);
      },
      error: (error: HttpErrorResponse) => {
         this.errorMessage = error.error.message || 'Login failed. Please check your credentials.';
        this.isLoading = false;
      }
    });
  }

   onForgotPassword() {
    this._Router.navigate(['/forgot-password']);
  }
}