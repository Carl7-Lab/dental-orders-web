import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Clinic } from '../../interfaces/clinic.interface';

@Injectable({ providedIn: 'root' })
export class FormClinicService {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  createForm(isCreate: boolean = true): FormGroup {
    const formConfig = {
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      address: ['', [Validators.maxLength(200)]],
      phone: ['', [Validators.pattern(/^[\+]?[0-9\s\-\(\)]{7,15}$/)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
    };

    return this.formBuilder.group(formConfig);
  }

  patchFormWithEntity(form: FormGroup, clinic: Clinic): void {
    form.patchValue({
      name: clinic.name,
      address: clinic.address || '',
      phone: clinic.phone || '',
      email: clinic.email || '',
    });
  }
}
