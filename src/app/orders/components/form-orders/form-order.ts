import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../shared/services/form-valid.service';
import { ORDER_STATUS_OPTIONS, ORDER_TYPE_OPTIONS } from '../../services/order.service';
import { PatientService } from '../../../patients/services/patients.service';
import { DoctorService } from '../../../doctors/services/doctors.service';
import { FormSelectComponent } from '../../../shared/components/form/form-select/form-select.component';
import { FormDateComponent } from '../../../shared/components/form/form-date/form-date.component';
import { FormActionsComponent } from '../../../shared/components/form/form-actions/form-actions.component';
import { FormHeaderComponent } from '../../../shared/components/form/form-header/form-header.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'form-order',
  imports: [
    ReactiveFormsModule,
    FormSelectComponent,
    FormDateComponent,
    FormActionsComponent,
    FormHeaderComponent,
    PageHeaderComponent,
  ],
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

  patientOptions = computed(() =>
    this.patients.map((patient) => ({ value: patient.id.toString(), label: patient.name }))
  );

  doctorOptions = computed(() =>
    this.doctors.map((doctor) => ({ value: doctor.id.toString(), label: doctor.name }))
  );

  formUtils = FormUtils;

  onSubmit() {
    if (this.isSubmitBlocked()) {
      return;
    }
    this.formSubmit.emit();
  }
}
