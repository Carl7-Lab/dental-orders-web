import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../../shared/services/form-valid.service';
import { FormTextComponent } from '../../../../shared/components/form/form-text/form-text.component';
import { FormTextareaComponent } from '../../../../shared/components/form/form-textarea/form-textarea.component';
import { FormActionsComponent } from '../../../../shared/components/form/form-actions/form-actions.component';
import { FormHeaderComponent } from '../../../../shared/components/form/form-header/form-header.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'form-clinic',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormTextComponent,
    FormTextareaComponent,
    FormActionsComponent,
    FormHeaderComponent,
    PageHeaderComponent,
  ],
  templateUrl: './form-clinic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormClinicComponent {
  form = input.required<FormGroup>();
  pageTitle = input.required<string>();
  pageSubtitle = input.required<string>();
  submitButtonText = input.required<string>();
  cancelRoute = input.required<string>();
  isSubmitBlocked = input<boolean>(false);

  formSubmit = output<void>();
  formUtils = FormUtils;

  onSubmit() {
    if (this.isSubmitBlocked()) return;
    this.formSubmit.emit();
  }
}
