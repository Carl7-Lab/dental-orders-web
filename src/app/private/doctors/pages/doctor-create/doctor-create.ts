import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import FormDoctorComponent from '../../components/form-doctors/form-doctor';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { FormDoctorService } from '../../services/form-doctor.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'create-doctor',
  imports: [FormDoctorComponent],
  template: `
    <form-doctor
      [form]="myForm"
      [pageTitle]="'Crear Doctor'"
      [pageSubtitle]="'Crear un nuevo doctor'"
      [submitButtonText]="'Crear Doctor'"
      [isSubmitBlocked]="isSubmitBlocked()"
      [cancelRoute]="doctors_list"
      (formSubmit)="onSubmit()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDoctor {
  doctors_list = FULL_NAVIGATION_PATHS.DOCTORS_LIST;

  private doctorFormService = inject(FormDoctorService);

  isSubmitBlocked = signal(false);

  myForm: FormGroup = this.doctorFormService.createForm();

  onSubmit() {
    if (this.isSubmitBlocked()) {
      return;
    }

    this.doctorFormService.onSubmit(this.myForm, (formData) => {
      console.log('Creando doctor:', formData);
      // Aquí iría la lógica para crear el doctor
      this.doctorFormService.navigateToDoctorsList();
    });
  }
}
