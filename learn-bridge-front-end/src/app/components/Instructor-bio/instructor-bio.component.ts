import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import axios from 'axios';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-instructor-bio',
  standalone: false,
  templateUrl: './instructor-bio.component.html',
  styleUrls: ['./instructor-bio.component.scss'],
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
      avgPrice: ['', [Validators.required, Validators.min(0)]],
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
      firstName: pendingData.firstName,
      lastName: pendingData.lastName,
      email: pendingData.email,
      password: pendingData.password,
      role: pendingData.role,
      favouriteCategory: pendingData.favouriteCategory,
      bio: this.bioForm.value.bio,
      avgPrice: this.bioForm.value.avgPrice,
      universityInfo: this.bioForm.value.universityInfo,
    };

    this.isLoading = true;

    // TODO: fix api call when deploy the project...
    axios
      .post('http://localhost:8080/api/register', fullUserData)
      .then(() => {
        this.isLoading = false;
        this._Router.navigate(['/instructor/home']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
