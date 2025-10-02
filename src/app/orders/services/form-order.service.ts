import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../shared/constants/navigation-path';
import { DateFormatterService } from '../../shared/services/date-formatter.service';
import { Order } from '../interfaces/order.interface';
import { OrderStatus } from './order.service';

@Injectable({
  providedIn: 'root',
})
export class FormOrderService {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  createForm(): FormGroup {
    return this.formBuilder.group({
      orderType: ['', [Validators.required]],
      status: [OrderStatus.PENDING, []],
      orderDate: ['', [Validators.required]],
      doctorId: ['', [Validators.required]],
      patientId: ['', [Validators.required]],
    });
  }

  patchFormWithOrder(form: FormGroup, note: any): void {
    if (note) {
      form.patchValue({
        orderType: note.orderType,
        status: note.status,
        orderDate: DateFormatterService.toDateInput(note.orderDate),
        doctorId: note.doctor.id,
        patientId: note.patient.id,
      });
    }
  }

  onSubmit(form: FormGroup, submitCallback: (formData: Order) => void): void {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const formData = {
      ...form.value,
    };

    submitCallback(formData);
  }

  navigateToOrdersList(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.ORDERS_LIST]);
  }

  navigateToNotFound(): void {
    this.router.navigate([FULL_NAVIGATION_PATHS.NOT_FOUND]);
  }
}
