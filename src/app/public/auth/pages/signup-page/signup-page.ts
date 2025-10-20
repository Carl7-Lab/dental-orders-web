import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { FormHeaderComponent } from '../../../../shared/components/form/form-header/form-header.component';
import { FormTextComponent } from '../../../../shared/components/form/form-text/form-text.component';
import { FormActionsComponent } from '../../../../shared/components/form/form-actions/form-actions.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { FormUtils } from '../../../../shared/services/form-valid.service';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';

@Component({
  selector: 'signup-page',
  imports: [
    ReactiveFormsModule,
    PageHeaderComponent,
    FormHeaderComponent,
    FormTextComponent,
    FormActionsComponent,
  ],
  templateUrl: './signup-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignUpPage {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  toastService = inject(ToastService);
  formUtils = FormUtils;

  isSubmitBlocked = signal(false);
  isLoading = signal(false);
  authSignInPath = FULL_NAVIGATION_PATHS.AUTH_SIGN_IN;

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    phone: ['', [Validators.pattern(/^\d{10}$/)]],
    address: ['', [Validators.maxLength(100)]],
    role: ['DOCTOR', [Validators.required]],
  });

  onSubmit() {
    if (this.form.invalid || this.isSubmitBlocked()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.isSubmitBlocked.set(true);

    this.authService.register(this.form.value).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate([FULL_NAVIGATION_PATHS.DASHBOARD]);
        } else {
          this.toastService.error('El email ya está registrado');
        }
      },
      complete: () => {
        setTimeout(() => {
          this.isLoading.set(false);
          this.isSubmitBlocked.set(false);
        }, 2000);
      },
    });
  }

  get cancelRoute(): string {
    return this.authSignInPath;
  }

  get submitButtonText(): string {
    return 'Registrarse';
  }
}
