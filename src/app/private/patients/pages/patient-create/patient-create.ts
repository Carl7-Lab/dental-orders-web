import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import FormPatientComponent from '../../components/form-patients/form-patient';
import { FormPatientService } from '../../components/form-patients/form-patient.service';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { PatientsService } from '../../services/patients.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'create-patient',
  imports: [FormPatientComponent, ConfirmationModalComponent, CommonModule],
  templateUrl: './patient-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePatient {
  private patientsService = inject(PatientsService);
  private formPatientService = inject(FormPatientService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;
  patientsListPath = FULL_NAVIGATION_PATHS.PATIENTS_LIST;

  form = this.formPatientService.createForm();
  showConfirmationModal = signal(false);

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.error('Por favor, completa todos los campos requeridos');
      return;
    }

    this.showConfirmationModal.set(true);
  }

  onConfirmCreate() {
    this.showConfirmationModal.set(false);

    let patientData = this.form.value;
    patientData = { ...patientData, email: undefined, phone: undefined };

    this.patientsService.createPatient(patientData).subscribe({
      next: (patient) => {
        this.toastService.success('Paciente creado exitosamente');
        this.router.navigate([this.patientsListPath]);
      },
      error: (error) => {
        console.error('Error creating patient:', error);
        this.toastService.error('Error al crear el paciente. Por favor, intenta nuevamente');
      },
    });
  }

  onCancelCreate() {
    this.showConfirmationModal.set(false);
  }
}
