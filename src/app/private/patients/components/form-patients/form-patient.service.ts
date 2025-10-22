import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { Patient } from '../../interfaces/patient.interface';

@Injectable({
  providedIn: 'root',
})
export class FormPatientService {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  createForm(isCreate: boolean = true): FormGroup {
    const formConfig: any = {
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.pattern(/^\d{10}$/)]],
      address: ['', [Validators.minLength(3), Validators.maxLength(200)]],
      notes: ['', [Validators.minLength(3), Validators.maxLength(500)]],
    };

    return this.formBuilder.group(formConfig);
  }

  patchFormWithPatient(form: FormGroup, patient: Patient): void {
    if (patient) {
      console.log('patching form with patient =>', patient);
      form.patchValue({
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        address: patient.address,
        notes: patient.notes,
      });
    }
  }

  onSubmit(form: FormGroup, submitCallback: (formData: Partial<Patient>) => void): void {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const formData = {
      ...form.value,
    };

    submitCallback(formData);
  }

  navigateToPatientsList(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.PATIENTS_LIST]);
  }

  navigateToNotFound(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.NOT_FOUND]);
  }
}
