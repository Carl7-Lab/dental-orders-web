import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'form-textarea',
  standalone: true,
  template: `
    <div class="space-y-3" [formGroup]="form">
      <label class="text-sm font-semibold text-base-content mb-3 flex items-center gap-2">
        <app-icon [name]="iconName" [size]="iconSize"></app-icon>
        {{ label }}
      </label>
      <div class="relative">
        <textarea
          class="w-full px-4 py-3 bg-base-200 border-2 border-base-300 rounded-xl text-base-content placeholder-base-content/50 focus:border-primary focus:bg-base-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 resize-none"
          [formControlName]="fieldName"
          [placeholder]="placeholder"
          [rows]="rows"
        ></textarea>
        <app-error-message [form]="form" [fieldName]="fieldName" [formUtils]="formUtils">
        </app-error-message>
      </div>
    </div>
  `,
  imports: [ReactiveFormsModule, IconComponent, ErrorMessageComponent],
})
export class FormTextareaComponent {
  @Input() form!: FormGroup;
  @Input() fieldName!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() rows: number = 3;
  @Input() iconName!: string;
  @Input() iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string = 'md';
  @Input() formUtils: any;
}
