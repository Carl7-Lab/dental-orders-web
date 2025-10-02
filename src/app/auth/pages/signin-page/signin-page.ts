import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtils } from '../../../shared/services/form-valid.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FormHeaderComponent } from '../../../shared/components/form/form-header/form-header.component';
import { FormTextComponent } from '../../../shared/components/form/form-text/form-text.component';
import { FormActionsComponent } from '../../../shared/components/form/form-actions/form-actions.component';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';

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
  form: FormGroup;
  formUtils = FormUtils;

  isSubmitBlocked = signal(false);
  isLoading = signal(false);
  authSignUpPath = FULL_NAVIGATION_PATHS.AUTH_SIGN_UP;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.invalid || this.isSubmitBlocked()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.isSubmitBlocked.set(true);

    setTimeout(() => {
      console.log('Inicio de sesión:', this.form.value);
      console.log('Ir a la pagina de inicio');
    }, 2000);
  }

  get cancelRoute(): string {
    return this.authSignUpPath;
  }

  get submitButtonText(): string {
    return 'Iniciar Sesión';
  }
}
