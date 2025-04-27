import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-instructor-bio',
  standalone: false,
  templateUrl: './instructor-bio.component.html',
  styleUrls: ['./instructor-bio.component.scss']
})
export class InstructorBioComponent implements OnInit {
  bioForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  ngOnInit() {
    this.bioForm = this._FormBuilder.group({
      universityInfo: ['', Validators.required],
      bio: ['', Validators.required],
      avgPrice: ['', [Validators.required, Validators.min(0)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.bioForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmitBio() {
    if (this.bioForm.invalid) {
      return;
    }

    const pendingDataString = localStorage.getItem('pendingInstructor');

    if (!pendingDataString) {
      this.errorMessage = 'Registration data not found. Please register again.';
      return;
    }

    const pendingData = JSON.parse(pendingDataString);

    const fullUserData = {
      name: `${pendingData.firstName} ${pendingData.lastName}`,
      email: pendingData.email,
      password: pendingData.password,
      role: pendingData.role,
      favouriteCategory: pendingData.favouriteCategory,
      bio: this.bioForm.value.bio,
      avgPrice: this.bioForm.value.avgPrice,
      universityInfo: this.bioForm.value.universityInfo
    };

    this.isLoading = true;

    this._AuthService.setRegister(fullUserData).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.removeItem('pendingInstructor'); // Clear temporary data
        this._Router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.error.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
