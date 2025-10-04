import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from '../../services/toast.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="toast toast-top toast-end z-50">
      @for (toast of toasts(); track toast.id) {
      <div
        class="alert shadow-lg animate-in slide-in-from-right-full duration-300"
        [class]="getToastClass(toast.type)"
      >
        <div class="flex items-center gap-2">
          <app-icon [name]="getIconName(toast.type)" size="sm" customClasses="text-white" />
          <span>{{ toast.message }}</span>
        </div>
        <button class="btn btn-sm btn-circle btn-ghost" (click)="removeToast(toast.id)">✕</button>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .animate-in {
        animation: slideIn 0.3s ease-out;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `,
  ],
})
export class ToastComponent {
  private toastService = inject(ToastService);

  toasts = this.toastService.toasts;

  getToastClass(type: ToastMessage['type']): string {
    const baseClasses = 'text-white';

    switch (type) {
      case 'success':
        return `${baseClasses} bg-success`;
      case 'error':
        return `${baseClasses} bg-error`;
      case 'warning':
        return `${baseClasses} bg-warning`;
      case 'info':
      default:
        return `${baseClasses} bg-info`;
    }
  }

  getIconName(type: ToastMessage['type']): string {
    switch (type) {
      case 'success':
        return 'SUCCESS';
      case 'error':
        return 'ERROR';
      case 'warning':
        return 'WARNING';
      case 'info':
      default:
        return 'INFO';
    }
  }

  removeToast(id: string): void {
    this.toastService.remove(id);
  }
}
