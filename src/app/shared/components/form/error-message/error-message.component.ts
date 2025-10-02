import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'app-error-message',
  standalone: true,
  template: `
    @if (showError) {
    <div class="flex items-center gap-2 text-error text-sm mt-2">
      <app-icon name="ERROR" [size]="iconSize"></app-icon>
      {{ errorMessage }}
    </div>
    }
  `,
  imports: [IconComponent],
})
export class ErrorMessageComponent {
  @Input() form!: FormGroup;
  @Input() fieldName!: string;
  @Input() formUtils: any;
  @Input() iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string = 'md';

  get showError(): boolean {
    return this.formUtils?.isValidField(this.form, this.fieldName) || false;
  }

  get errorMessage(): string {
    return this.formUtils?.getFieldError(this.form, this.fieldName) || '';
  }
}
