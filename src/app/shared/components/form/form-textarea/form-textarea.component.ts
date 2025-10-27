import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'form-textarea',
  standalone: true,
  template: `
    <div class="space-y-3" [formGroup]="form">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          <app-icon [name]="iconName" [size]="iconSize" />
          {{ label }} <span class="text-error">{{ isRequired ? '*' : '' }}</span>
        </legend>
        <textarea
          class="textarea textarea-bordered w-full focus:border-primary focus:ring-4 focus:ring-primary/20 resize-none"
          [formControlName]="fieldName"
          [placeholder]="hasValue() ? '' : placeholder"
          [rows]="rows"
        ></textarea>
        <app-error-message [form]="form" [fieldName]="fieldName" [formUtils]="formUtils" />
      </fieldset>
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
  @Input() isRequired: boolean = false;

  hasValue(): boolean {
    const control = this.form.get(this.fieldName);
    return control ? control.value && control.value.toString().trim() !== '' : false;
  }
}
