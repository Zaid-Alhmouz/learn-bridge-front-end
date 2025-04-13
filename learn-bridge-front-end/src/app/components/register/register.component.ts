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
  isLoading = false;
  errorMessage: string = '';
  signupSubmitted = false;

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this._FormBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      role: ['', [
        Validators.required
      ]],
      favoriteCategories: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$')
      ]],
      confirmPassword: ['', [
        Validators.required
      ]]
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    });

    this.signupForm.get('role')?.valueChanges.subscribe(role => {
      console.log('Selected role:', role);
    });
  }

  // Custom validator to check if password and confirm password match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
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

    // Stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    // Set loading state to true
    this.isLoading = true;
    this.errorMessage = ''; // Clear any previous error messages

    // Format the data according to your API requirements
    const userData = {
      name: `${this.signupForm.value.firstName} ${this.signupForm.value.lastName}`,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      role: this.signupForm.value.role,
      favoriteCategories: this.signupForm.value.favoriteCategories
    };

    this._AuthService.setRegister(userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        // If the selected role is "instructor", navigate to instructor-bio page
        if (this.signupForm.value.role === 'instructor') {
          this._Router.navigate(['/instructor-bio']);
        } else {
          // Otherwise navigate to login
          this._Router.navigate(['/login']);
        }
      },
      error: (error: HttpErrorResponse) => {
        // Set error message and reset loading state
        this.errorMessage = error.error.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }

  // Method to handle Google sign up
  signUpWithGoogle() {
    // this.isLoading = true;
    // this.errorMessage = '';
    
    // this._AuthService.signUpWithGoogle().subscribe({
    //   next: (response) => {
    //     this.isLoading = false;
    //     // Navigate based on user role from Google response
    //     if (response.role === 'instructor') {
    //       this._Router.navigate(['/instructor-bio']);
    //     } else {
    //       this._Router.navigate(['/login']);
    //     }
    //   },
    //   error: (error: HttpErrorResponse) => {
    //     this.errorMessage = error.error.message || 'Google signup failed. Please try again.';
    //     this.isLoading = false;
    //   }
    // });
  }
}

