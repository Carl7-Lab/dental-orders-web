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
      <label class="text-sm font-semibold text-base-content mb-3 flex items-center gap-1">
        <app-icon [name]="iconName" [size]="iconSize"></app-icon>
        {{ label }} <span class="text-error">{{ isRequired ? '*' : '' }}</span>
      </label>
      <div class="relative">
        <select
          class="select select-bordered w-full focus:border-primary focus:ring-4 focus:ring-primary/20"
          [formControlName]="fieldName"
        >
          <option disabled selected value="">{{ placeholder }}</option>
          @for( option of options; track option.value ){
          <option value="{{ option.value }}">{{ option.label }}</option>
          }
        </select>
        <app-error-message [form]="form" [fieldName]="fieldName" [formUtils]="formUtils">
        </app-error-message>
      </div>
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
}
