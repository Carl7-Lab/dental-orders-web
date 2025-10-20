import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class FormUserService {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  createForm(isCreate: boolean = true): FormGroup {
    const formConfig: any = {
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      phone: ['', [Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.minLength(3), Validators.maxLength(100)]],
      role: ['', [Validators.required]],
    };

    // Email solo se puede modificar al crear, no al actualizar
    if (isCreate) {
      formConfig.email = ['', [Validators.required, Validators.email, Validators.maxLength(100)]];
      formConfig.password = [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
      ];
    } else {
      // En actualización, email es solo lectura (sin validaciones de requerido)
      formConfig.email = [{ value: '', disabled: true }];
    }

    return this.formBuilder.group(formConfig);
  }

  patchFormWithUser(form: FormGroup, user: User): void {
    if (user) {
      console.log('patching form with user =>', user);
      form.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      });
    }
  }

  onSubmit(form: FormGroup, submitCallback: (formData: Partial<User>) => void): void {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const formData = {
      ...form.value,
    };

    submitCallback(formData);
  }

  navigateToUsersList(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.USERS_LIST]);
  }

  navigateToNotFound(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.NOT_FOUND]);
  }
}
