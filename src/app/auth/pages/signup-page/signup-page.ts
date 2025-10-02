import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtils } from '../../../shared/services/form-valid.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FormHeaderComponent } from '../../../shared/components/form/form-header/form-header.component';
import { FormTextComponent } from '../../../shared/components/form/form-text/form-text.component';
import { FormActionsComponent } from '../../../shared/components/form/form-actions/form-actions.component';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';
import { FormSelectComponent } from '../../../shared/components/form/form-select/form-select.component';

@Component({
  selector: 'signup-page',
  imports: [
    ReactiveFormsModule,
    PageHeaderComponent,
    FormHeaderComponent,
    FormTextComponent,
    FormActionsComponent,
    FormSelectComponent,
  ],
  templateUrl: './signup-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignUpPage {
  form: FormGroup;
  formUtils = FormUtils;

  isSubmitBlocked = signal(false);
  isLoading = signal(false);
  authSignInPath = FULL_NAVIGATION_PATHS.AUTH_SIGN_IN;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      phone: ['', [Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.maxLength(100)]],
      role: ['DOCTOR', [Validators.required]],
    });
  }

  roles = [
    { value: 'ADMIN', label: 'Administrador' },
    { value: 'DOCTOR', label: 'Doctor' },
  ];

  onSubmit() {
    if (this.form.invalid || this.isSubmitBlocked()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.isSubmitBlocked.set(true);

    setTimeout(() => {
      console.log('Registro:', this.form.value);
      console.log('Ir a la pagina de inicio');
    }, 2000);
  }

  get cancelRoute(): string {
    return this.authSignInPath;
  }

  get submitButtonText(): string {
    return 'Registrarse';
  }
}
