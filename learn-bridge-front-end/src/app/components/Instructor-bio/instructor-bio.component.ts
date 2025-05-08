import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bioForm = this.fb.group({
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
    if (this.bioForm.invalid) return;

    const pendingDataString = localStorage.getItem('pendingInstructor');
    if (!pendingDataString) {
      this.errorMessage = 'بيانات التسجيل مش موجودة. ارجع سجّل من جديد.';
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

    this.authService.setRegister(fullUserData).subscribe({
      next: () => {
        this.isLoading = false;
        localStorage.removeItem('pendingInstructor'); // بنمسح الداتا المؤقتة
        this.router.navigate(['/instructor/home']);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'صار في مشكلة أثناء التسجيل، جرب مرة ثانية.';
      },
    });
  }
}
