import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  signupSubmitted = false;
  errorMessage: string = '';
  isLoading = false; // New loading state

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) { }

  ngOnInit() {
    // Initialize signup form with validators
    this.signupForm = this._FormBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')
      ]]
    });
  }

  // Getter for easy access to form fields
  get sf() { return this.signupForm.controls; }

  // onSignupSubmit() {
  //   this.signupSubmitted = true;

  //   // Stop here if form is invalid
  //   if (this.signupForm.invalid) {
  //     // Add shake animation to invalid fields
  //     const invalidControls = document.querySelectorAll('.signup-form .ng-invalid');

  //     invalidControls.forEach(element => {
  //       element.classList.add('shake');
  //       setTimeout(() => element.classList.remove('shake'), 500);
  //     });

  //     return;
  //   }

  //   // Add success animation
  //   document.querySelector('.signup-form')?.classList.add('form-submitted');

  //   // Call the registration service
  //   this._AuthService.setRegister(this.signupForm.value).subscribe({
  //     next: (response) => {

  //       // navigate to login or dashboard
  //       this._Router.navigate(['/login']);
  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.errorMessage = error.error.message;
  //     }
  //   });
  // }

  // ******************************************************************************
  onSignupSubmit() {
    this.signupSubmitted = true;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    // Set loading state to true
    this.isLoading = true;
    this.errorMessage = ''; // Clear any previous error messages

    this._AuthService.setRegister(this.signupForm.value).subscribe({
      next: (response) => {
        // Explicitly navigate to login page
          this._Router.navigate(['/login']);
        // Ensure loading state is reset
        this.isLoading = false;
      },
      error: (error) => {
        // Set error message and reset loading state
        this.errorMessage = error.error.message || 'Registration failed';
        this.isLoading = false;
      }
    });
  }
}

