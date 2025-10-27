import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'form-select',
  standalone: true,
  template: `
    <div class="space-y-3" [formGroup]="form">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          <app-icon [name]="iconName" [size]="iconSize" />
          {{ label }} <span class="text-error">{{ isRequired ? '*' : '' }}</span>
        </legend>
        <select class="{{ getInputClasses() }} " [formControlName]="fieldName">
          <option disabled selected value="" class="italic">{{ placeholder }}</option>
          @for( option of options; track option.value ){
          <option value="{{ option.value }}" class="text-base-content sans-serif">
            {{ option.label }}
          </option>
          }
        </select>
        <app-error-message [form]="form" [fieldName]="fieldName" [formUtils]="formUtils" />
      </fieldset>
    </div>
  `,
  imports: [ReactiveFormsModule, IconComponent, ErrorMessageComponent],
})
export class FormSelectComponent {
  @Input() form!: FormGroup;
  @Input() fieldName!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() options: SelectOption[] = [];
  @Input() iconName!: string;
  @Input() iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string = 'md';
  @Input() formUtils: any;
  @Input() isRequired: boolean = false;

  hasValue(): boolean {
    const control = this.form.get(this.fieldName);
    return control ? control.value && control.value.toString().trim() !== '' : false;
  }

  getInputClasses(): string {
    const baseClasses =
      'select select-bordered w-full focus:border-primary focus:ring-4 focus:ring-primary/20 cursor-pointer focus:bg-base-100 focus-within:bg-base-100';

    if (this.hasValue()) {
      return `${baseClasses} bg-base-300/40 border-base-300`;
    }

    return `${baseClasses} bg-base-300/20 border-base-300/70 placeholder-base-content/25`;
  }
}
