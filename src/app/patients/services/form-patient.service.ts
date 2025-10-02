import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../shared/constants/navigation-path';
import { Patient } from '../interfaces/patient.interface';

@Injectable({
  providedIn: 'root',
})
export class FormPatientService {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      notes: ['', []], // Notes are optional
    });
  }

  patchFormWithPatient(form: FormGroup, patient: Patient): void {
    if (patient) {
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
