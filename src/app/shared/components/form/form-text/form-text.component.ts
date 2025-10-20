import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'form-text',
  standalone: true,
  template: `
    <div class="space-y-3" [formGroup]="form">
      <label class="text-sm font-semibold text-base-content mb-3 flex items-center gap-1">
        <app-icon [name]="iconName" [size]="iconSize"></app-icon>
        {{ label }} <span class="text-error">{{ isRequired ? '*' : '' }}</span>
      </label>
      <div class="relative">
        <input
          [type]="inputType"
          [class]="getInputClasses()"
          [formControlName]="fieldName"
          [placeholder]="hasValue() ? '' : placeholder"
          [disabled]="isDisabled"
        />
        <app-error-message [form]="form" [fieldName]="fieldName" [formUtils]="formUtils">
        </app-error-message>
      </div>
    </div>
  `,
  imports: [ReactiveFormsModule, IconComponent, ErrorMessageComponent],
})
export class FormTextComponent {
  @Input() form!: FormGroup;
  @Input() fieldName!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() inputType: 'text' | 'email' | 'tel' | 'password' | 'url' = 'text';
  @Input() iconName!: string;
  @Input() iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string = 'md';
  @Input() formUtils: any;
  @Input() isRequired: boolean = false;
  @Input() isDisabled: boolean = false;

  hasValue(): boolean {
    const control = this.form.get(this.fieldName);
    return control ? control.value && control.value.toString().trim() !== '' : false;
  }

  getInputClasses(): string {
    const baseClasses =
      'w-full px-4 py-3 border-2 rounded-xl focus:border-primary transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20';

    if (this.isDisabled) {
      return `${baseClasses} bg-base-300/40 border-base-300/50 text-base-content/60 cursor-not-allowed opacity-60`;
    } else if (this.hasValue()) {
      return `${baseClasses} bg-base-300/60 border-base-300 focus:bg-base-100 text-base-content`;
    } else {
      return `${baseClasses} bg-base-300/20 border-base-300/70 focus:bg-base-100 text-base-content/30 placeholder-base-content/25 italic`;
    }
  }
}
