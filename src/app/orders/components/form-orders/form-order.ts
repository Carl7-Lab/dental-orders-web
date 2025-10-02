import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormUtils } from '../../../shared/services/form-valid.service';
import { ORDER_STATUS_OPTIONS, ORDER_TYPE_OPTIONS } from '../../services/order.service';
import { PatientService } from '../../../patients/services/patients.service';
import { DoctorService } from '../../../doctors/services/doctors.service';

@Component({
  selector: 'form-order',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form-order.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormOrderComponent {
  form = input.required<FormGroup>();
  pageTitle = input.required<string>();
  pageSubtitle = input.required<string>();
  submitButtonText = input.required<string>();
  cancelRoute = input.required<string>();
  isSubmitBlocked = input<boolean>(false);

  formSubmit = output<void>();

  typeOptions = ORDER_TYPE_OPTIONS;
  statusOptions = ORDER_STATUS_OPTIONS;

  patients = inject(PatientService).patients;
  doctors = inject(DoctorService).doctors;

  formUtils = FormUtils;

  onSubmit() {
    if (this.isSubmitBlocked()) {
      return;
    }
    this.formSubmit.emit();
  }
}
