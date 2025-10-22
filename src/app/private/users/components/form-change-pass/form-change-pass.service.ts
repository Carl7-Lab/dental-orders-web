import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { FormUtils } from '../../../../shared/services/form-valid.service';

@Injectable({
  providedIn: 'root',
})
export class FormChangePassService {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  createForm(): FormGroup {
    return this.formBuilder.group(
      {
        'new-password': [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
        ],
        confirmPassword: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
        ],
      },
      {
        validators: FormUtils.passwordMatchValidator('new-password', 'confirmPassword'),
      }
    );
  }

  onSubmit(
    form: FormGroup,
    submitCallback: (formData: { password: string; confirmPassword: string }) => void
  ): void {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    submitCallback(form.value);
  }

  navigateToDashboard(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.DASHBOARD]);
  }

  navigateToNotFound(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.NOT_FOUND]);
  }
}
