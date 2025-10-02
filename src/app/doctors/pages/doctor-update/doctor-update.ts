import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import FormDoctorComponent from '../../components/form-doctors/form-doctor';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';
import { FormDoctorService } from '../../services/form-doctor.service';
import { FormGroup } from '@angular/forms';
import { DoctorService } from '../../services/doctors.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'update-doctor',
  imports: [FormDoctorComponent],
  template: `
    <form-doctor
      [form]="myForm"
      [pageTitle]="'Actualizar Doctor'"
      [pageSubtitle]="'Actualizar un doctor'"
      [submitButtonText]="'Actualizar Doctor'"
      [isSubmitBlocked]="isSubmitBlocked()"
      [cancelRoute]="doctors_list"
      (formSubmit)="onSubmit()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateDoctor implements OnInit, OnDestroy {
  doctors_list = FULL_NAVIGATION_PATHS.DOCTORS_LIST;

  private doctorFormService = inject(FormDoctorService);
  private doctorService = inject(DoctorService);
  private route = inject(ActivatedRoute);

  doctor = this.doctorService.doctor;
  doctorId: number | null = null;

  isSubmitBlocked = signal(false);

  private routeSubscription?: Subscription;

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.doctorId = params['id'];

      if (this.doctorId) {
        console.log('doctor id =>', this.doctorId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  myForm: FormGroup = this.doctorFormService.createForm();

  constructor() {
    effect(() => {
      const currentDoctor = this.doctor;
      if (currentDoctor) {
        this.doctorFormService.patchFormWithDoctor(this.myForm, currentDoctor);
      }
    });

    effect(() => {
      // TODO: si hay un error al no encuentra el doctor enviar not-found page
    });
  }

  onSubmit() {
    if (this.isSubmitBlocked()) {
      return;
    }

    this.doctorFormService.onSubmit(this.myForm, (formData) => {
      console.log('Se actualizó el doctor:', formData);
      this.doctorFormService.navigateToDoctorsList();
    });
  }
}
