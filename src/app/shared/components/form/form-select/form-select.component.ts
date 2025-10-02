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
      <label class="text-sm font-semibold text-base-content mb-3 flex items-center gap-2">
        <app-icon [name]="iconName" [size]="iconSize"></app-icon>
        {{ label }}
      </label>
      <div class="relative">
        <select
          class="w-full px-4 py-3 bg-base-200 border-2 border-base-300 rounded-xl text-base-content placeholder-base-content/50 focus:border-primary focus:bg-base-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 appearance-none cursor-pointer"
          [formControlName]="fieldName"
        >
          <option disabled selected value="">{{ placeholder }}</option>
          @for( option of options; track option.value ){
          <option value="{{ option.value }}">{{ option.label }}</option>
          }
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <app-icon name="CHEVRON_DOWN" [size]="chevronSize"></app-icon>
        </div>
      </div>
      <app-error-message [form]="form" [fieldName]="fieldName" [formUtils]="formUtils">
      </app-error-message>
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
  @Input() chevronSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string = 'md';
  @Input() formUtils: any;
}
