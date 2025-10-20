import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import FormPatientComponent from '../../components/form-patients/form-patient';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { FormPatientService } from '../../services/form-patient.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'create-patient',
  imports: [FormPatientComponent],
  template: `
    <form-patient
      [form]="myForm"
      [pageTitle]="'Crear Paciente'"
      [pageSubtitle]="'Crear un nuevo paciente'"
      [submitButtonText]="'Crear Paciente'"
      [isSubmitBlocked]="isSubmitBlocked()"
      [cancelRoute]="patients_list"
      (formSubmit)="onSubmit()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePatient {
  patients_list = FULL_NAVIGATION_PATHS.PATIENTS_LIST;

  private patientFormService = inject(FormPatientService);

  isSubmitBlocked = signal(false);

  myForm: FormGroup = this.patientFormService.createForm();

  onSubmit() {
    if (this.isSubmitBlocked()) {
      return;
    }

    this.patientFormService.onSubmit(this.myForm, (formData) => {
      console.log('Creando paciente:', formData);
      // Aquí iría la lógica para crear el paciente
      this.patientFormService.navigateToPatientsList();
    });
  }
}
