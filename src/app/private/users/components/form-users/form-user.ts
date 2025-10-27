import { ChangeDetectionStrategy, Component } from '@angular/core';
import { input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../../../shared/services/form-valid.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { FormHeaderComponent } from '../../../../shared/components/form/form-header/form-header.component';
import { FormTextComponent } from '../../../../shared/components/form/form-text/form-text.component';
import { FormActionsComponent } from '../../../../shared/components/form/form-actions/form-actions.component';
import { Role } from '../../../../public/auth/services/auth.service';
import {
  FormSelectComponent,
  SelectOption,
} from '../../../../shared/components/form/form-select/form-select.component';

@Component({
  selector: 'form-user',
  imports: [
    ReactiveFormsModule,
    PageHeaderComponent,
    FormHeaderComponent,
    FormTextComponent,
    FormActionsComponent,
    FormSelectComponent,
  ],
  templateUrl: './form-user.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FormUserComponent {
  form = input.required<FormGroup>();
  pageTitle = input.required<string>();
  pageSubtitle = input.required<string>();
  submitButtonText = input.required<string>();
  cancelRoute = input.required<string>();
  isSubmitBlocked = input<boolean>(false);
  showPasswordField = input<boolean>(true); // Por defecto mostrar password (para creación)
  isEmailEditable = input<boolean>(true); // Por defecto email editable (para creación)

  formSubmit = output<void>();

  formUtils = FormUtils;

  rolesOptions: SelectOption[] = [
    { value: Role.ADMIN, label: 'Administrador' },
    { value: Role.DOCTOR, label: 'Doctor' },
    { value: Role.INTERN, label: 'Pasante' },
  ];

  onSubmit() {
    if (this.isSubmitBlocked()) {
      return;
    }
    this.formSubmit.emit();
  }
}
