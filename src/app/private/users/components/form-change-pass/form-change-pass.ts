import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../../shared/services/form-valid.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { FormHeaderComponent } from '../../../../shared/components/form/form-header/form-header.component';
import { FormTextComponent } from '../../../../shared/components/form/form-text/form-text.component';
import { FormActionsComponent } from '../../../../shared/components/form/form-actions/form-actions.component';

@Component({
  selector: 'form-change-pass',
  imports: [
    ReactiveFormsModule,
    PageHeaderComponent,
    FormHeaderComponent,
    FormTextComponent,
    FormActionsComponent,
  ],
  templateUrl: './form-change-pass.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormChangePassComponent {
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
