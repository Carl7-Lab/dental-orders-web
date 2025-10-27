import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'form-date',
  standalone: true,
  template: `
    <div class="space-y-3" [formGroup]="form">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          <app-icon [name]="iconName" [size]="iconSize" />
          {{ label }} <span class="text-error">{{ isRequired ? '*' : '' }}</span>
        </legend>
        <input
          type="date"
          class="input input-bordered w-full focus:border-primary focus:ring-4 focus:ring-primary/20"
          [formControlName]="fieldName"
          [placeholder]="placeholder"
        />
        <app-error-message [form]="form" [fieldName]="fieldName" [formUtils]="formUtils" />
      </fieldset>
    </div>
  `,
  imports: [ReactiveFormsModule, IconComponent, ErrorMessageComponent],
})
export class FormDateComponent {
  @Input() form!: FormGroup;
  @Input() fieldName!: string;
  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() iconName: string = 'CALENDAR';
  @Input() iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string = 'md';
  @Input() formUtils: any;
  @Input() isRequired: boolean = false;

  hasValue(): boolean {
    const control = this.form.get(this.fieldName);
    return control ? control.value && control.value.toString().trim() !== '' : false;
  }
}
