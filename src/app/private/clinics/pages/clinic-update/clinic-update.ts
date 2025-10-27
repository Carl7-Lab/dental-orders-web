import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ClinicsService } from '../../services/clinics.service';
import { FormClinicService } from '../../components/form-clinic/form-clinic.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { Clinic } from '../../interfaces/clinic.interface';
import FormClinicComponent from '../../components/form-clinic/form-clinic';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'update-clinic',
  imports: [FormClinicComponent, ConfirmationModalComponent, CommonModule, RouterModule],
  templateUrl: './clinic-update.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateClinic {
  private clinicsService = inject(ClinicsService);
  private formClinicService = inject(FormClinicService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;
  clinicsListPath = FULL_NAVIGATION_PATHS.CLINICS_LIST;

  clinicId = toSignal(this.route.params.pipe(map((params) => params['clinicId'])));

  form = this.formClinicService.createForm(false);
  showConfirmationModal = signal(false);

  clinicResource = rxResource({
    stream: () =>
      this.clinicsService.getClinic(parseInt(this.clinicId())).pipe(
        tap((clinic: Clinic) => {
          this.formClinicService.patchFormWithEntity(this.form, clinic);
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
    let clinicData = this.form.value;
    clinicData = { ...clinicData, email: undefined, phone: undefined };
    const clinicId = parseInt(this.clinicId());

    this.clinicsService.updateClinic(clinicId, clinicData).subscribe({
      next: (clinic) => {
        this.toastService.success('Clínica actualizada exitosamente');
        this.router.navigate([this.fullNavigationPaths.CLINICS_LIST]);
      },
      error: (error) => {
        console.error('Error updating clinic:', error);
        this.toastService.error('Error al actualizar la clínica. Por favor, intenta nuevamente');
      },
    });
  }
}
