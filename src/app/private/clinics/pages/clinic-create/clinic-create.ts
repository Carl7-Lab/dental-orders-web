import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicsService } from '../../services/clinics.service';
import { FormClinicService } from '../../components/form-clinic/form-clinic.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import FormClinicComponent from '../../components/form-clinic/form-clinic';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'create-clinic',
  imports: [FormClinicComponent, ConfirmationModalComponent, CommonModule, RouterModule],
  templateUrl: './clinic-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateClinic {
  private clinicsService = inject(ClinicsService);
  private formClinicService = inject(FormClinicService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;
  clinicsListPath = FULL_NAVIGATION_PATHS.CLINICS_LIST;

  form = this.formClinicService.createForm();
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
    const clinicData = this.form.value;

    this.clinicsService.createClinic(clinicData).subscribe({
      next: (clinic) => {
        this.toastService.success('Clínica creada exitosamente');
        this.router.navigate([this.clinicsListPath]);
      },
      error: (error) => {
        console.error('Error creating clinic:', error);
        this.toastService.error('Error al crear la clínica. Por favor, intenta nuevamente');
      },
    });
  }
}
