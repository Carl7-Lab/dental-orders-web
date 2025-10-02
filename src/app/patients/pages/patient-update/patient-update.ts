import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import FormPatientComponent from '../../components/form-patients/form-patient';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';
import { FormPatientService } from '../../services/form-patient.service';
import { FormGroup } from '@angular/forms';
import { PatientService } from '../../services/patients.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'update-patient',
  imports: [FormPatientComponent],
  template: `
    <form-patient
      [form]="myForm"
      [pageTitle]="'Actualizar Paciente'"
      [pageSubtitle]="'Actualizar un paciente'"
      [submitButtonText]="'Actualizar Paciente'"
      [isSubmitBlocked]="isSubmitBlocked()"
      [cancelRoute]="patients_list"
      (formSubmit)="onSubmit()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdatePatient implements OnInit, OnDestroy {
  patients_list = FULL_NAVIGATION_PATHS.PATIENTS_LIST;

  private patientFormService = inject(FormPatientService);
  private patientService = inject(PatientService);
  private route = inject(ActivatedRoute);

  patient = this.patientService.patient;
  patientId: number | null = null;

  isSubmitBlocked = signal(false);

  private routeSubscription?: Subscription;

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.patientId = params['id'];

      if (this.patientId) {
        console.log('patient id =>', this.patientId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  myForm: FormGroup = this.patientFormService.createForm();

  constructor() {
    effect(() => {
      const currentPatient = this.patient;
      if (currentPatient) {
        this.patientFormService.patchFormWithPatient(this.myForm, currentPatient);
      }
    });

    effect(() => {
      // TODO: si hay un error al no encuentra el paciente enviar not-found page
    });
  }

  onSubmit() {
    if (this.isSubmitBlocked()) {
      return;
    }

    this.patientFormService.onSubmit(this.myForm, (formData) => {
      console.log('Se actualizó el paciente:', formData);
      this.patientFormService.navigateToPatientsList();
    });
  }
}
