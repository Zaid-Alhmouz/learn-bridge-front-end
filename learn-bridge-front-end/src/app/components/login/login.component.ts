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
    // Initialize login form with validators
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

  // Getter for easy access to form fields
  get lf() { return this.loginForm.controls; }

  onLoginSubmit() {
    this.loginSubmitted = true;
    this.isLoading = true;
    if (this.loginForm.invalid) {
      const invalidControls = document.querySelectorAll('.login-form .ng-invalid');
      invalidControls.forEach(element => {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 500);
      });

      this.loginForm.markAllAsTouched();

      return;
    }

    this._AuthService.setLogin(this.loginForm.value).subscribe({
      next: (response) => {
        this.errorMessage = '';

        // localStorage.setItem("eToken", response.token);
        // this._AuthService.decodeUserData()

        this._Router.navigate(['/blank/home']);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        // Optional: You could add a similar shake animation for error cases
        this.loginSubmitted = false; // Reset submission flag on error
        this.errorMessage = error.error.message || 'Login failed. Please check your credentials.';
        this.isLoading = false;
      }
    });
  }

  // Optional: Add forgot password navigation
  onForgotPassword() {
    this._Router.navigate(['/forgot-password']);
  }
}