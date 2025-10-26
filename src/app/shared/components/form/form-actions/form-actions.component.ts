import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'form-actions',
  standalone: true,
  template: `
    <div class="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-base-300">
      <button
        type="button"
        class="btn btn-outline btn-lg hover:btn-error transition-all duration-300 flex items-center justify-center gap-2"
        [routerLink]="cancelRoute"
        [disabled]="isCancelDisabled"
      >
        <app-icon [name]="cancelIcon" [size]="iconSize"></app-icon>
        <span class="hidden sm:inline">{{ cancelText }}</span>
        <span class="sm:hidden">{{ cancelTextMobile || cancelText }}</span>
      </button>

      <button
        type="submit"
        class="btn btn-primary btn-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        [disabled]="isSubmitDisabled"
        (click)="onSubmit.emit()"
      >
        @if (isLoading) {
        <span class="loading loading-spinner {{ iconSize }}"></span>
        <span>{{ loadingText }}</span>
        } @else {
        <app-icon [name]="submitIcon" [size]="iconSize"></app-icon>
        <span>{{ submitText }}</span>
        }
      </button>
    </div>
  `,
  imports: [RouterLink, IconComponent],
})
export class FormActionsComponent {
  @Input() cancelRoute!: string;
  @Input() cancelText: string = 'Cancelar';
  @Input() cancelTextMobile?: string;
  @Input() cancelIcon: string = 'CLOSE';
  @Input() submitText!: string;
  @Input() submitIcon: string = 'PLUS';
  @Input() loadingText: string = 'Procesando...';
  @Input() loadingIcon: string = 'SPINNER';
  @Input() isSubmitDisabled: boolean = false;
  @Input() isCancelDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string = 'md';

  @Output() onSubmit = new EventEmitter<void>();
}
