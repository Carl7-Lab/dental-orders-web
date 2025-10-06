import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../shared/services/form-valid.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FormHeaderComponent } from '../../../shared/components/form/form-header/form-header.component';
import { FormTextComponent } from '../../../shared/components/form/form-text/form-text.component';
import { FormActionsComponent } from '../../../shared/components/form/form-actions/form-actions.component';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'signin-page',
  imports: [
    ReactiveFormsModule,
    PageHeaderComponent,
    FormHeaderComponent,
    FormTextComponent,
    FormActionsComponent,
  ],
  templateUrl: './signin-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignInPage {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  toastService = inject(ToastService);
  formUtils = FormUtils;

  isSubmitBlocked = signal(false);
  isLoading = signal(false);
  authSignUpPath = FULL_NAVIGATION_PATHS.AUTH_SIGN_UP;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.invalid || this.isSubmitBlocked()) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.isSubmitBlocked.set(true);

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response) {
          this.router.navigate([FULL_NAVIGATION_PATHS.DASHBOARD]);
        } else {
          this.toastService.error('El email o la contraseña son incorrectos');
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
    return this.authSignUpPath;
  }

  get submitButtonText(): string {
    return 'Iniciar Sesión';
  }
}
