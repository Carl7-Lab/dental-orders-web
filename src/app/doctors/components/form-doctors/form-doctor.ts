import { ChangeDetectionStrategy, Component } from '@angular/core';
import { input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormUtils } from '../../../shared/services/form-valid.service';

@Component({
  selector: 'form-doctor',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form-doctor.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormDoctorComponent {
  form = input.required<FormGroup>();
  pageTitle = input.required<string>();
  pageSubtitle = input.required<string>();
  submitButtonText = input.required<string>();
  cancelRoute = input.required<string>();
  isSubmitBlocked = input<boolean>(false);

  formSubmit = output<void>();

  formUtils = FormUtils;

  onSubmit() {
    if (this.isSubmitBlocked()) {
      return;
    }
    this.formSubmit.emit();
  }
}
