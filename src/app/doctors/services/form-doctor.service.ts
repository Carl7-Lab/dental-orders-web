import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../shared/constants/navigation-path';
import { Doctor } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root',
})
export class FormDoctorService {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      specialty: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  patchFormWithDoctor(form: FormGroup, doctor: Doctor): void {
    if (doctor) {
      form.patchValue({
        name: doctor.name,
        email: doctor.email,
        phone: doctor.phone,
        address: doctor.address,
        specialty: doctor.specialty,
      });
    }
  }

  onSubmit(form: FormGroup, submitCallback: (formData: Partial<Doctor>) => void): void {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const formData = {
      ...form.value,
    };

    submitCallback(formData);
  }

  navigateToDoctorsList(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.DOCTORS_LIST]);
  }

  navigateToNotFound(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.NOT_FOUND]);
  }
}
