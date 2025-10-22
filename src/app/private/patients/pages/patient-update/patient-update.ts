import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { PatientsService } from '../../services/patients.service';
import { ActivatedRoute, Router } from '@angular/router';
import FormPatientComponent from '../../components/form-patients/form-patient';
import { map, tap } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ToastService } from '../../../../shared/services/toast.service';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { FormPatientService } from '../../components/form-patients/form-patient.service';
import { Patient } from '../../interfaces/patient.interface';

@Component({
  selector: 'update-patient',
  imports: [FormPatientComponent, ConfirmationModalComponent, CommonModule],
  templateUrl: './patient-update.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePatient {
  private patientsService = inject(PatientsService);
  private formPatientService = inject(FormPatientService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;
  patientsListPath = FULL_NAVIGATION_PATHS.PATIENTS_LIST;

  patientId = toSignal(this.route.params.pipe(map((params) => params['patientId'])));

  form = this.formPatientService.createForm(false); // false = no es creación
  showConfirmationModal = signal(false);

  patientResource = rxResource({
    stream: () =>
      this.patientsService.getPatient(parseInt(this.patientId())).pipe(
        tap((patient: Patient) => {
          this.formPatientService.patchFormWithPatient(this.form, patient);
        })
      ),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toastService.error('Por favor, completa todos los campos requeridos');
      return;
    }

    this.showConfirmationModal.set(true);
  }

  onConfirmUpdate() {
    this.showConfirmationModal.set(false);

    let patientData = this.form.value;
    patientData = { ...patientData, email: undefined, phone: undefined };
    const patientId = parseInt(this.patientId());

    this.patientsService.updatePatient(patientId, patientData).subscribe({
      next: (patient) => {
        this.toastService.success('Paciente actualizado exitosamente');
        this.router.navigate([this.fullNavigationPaths.PATIENTS_LIST]);
      },
      error: (error) => {
        console.error('Error updating patient:', error);
        this.toastService.error('Error al actualizar el paciente. Por favor, intenta nuevamente');
      },
    });
  }

  onCancelUpdate() {
    this.showConfirmationModal.set(false);
  }
}
