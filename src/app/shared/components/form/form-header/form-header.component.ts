import { Component, Input } from '@angular/core';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'form-header',
  standalone: true,
  template: `
    <div class="bg-gradient-to-r from-primary/5 to-secondary/5 px-6 py-4 border-b border-base-300">
      <h2 class="text-2xl font-semibold text-base-content flex items-center gap-3">
        <app-icon [name]="iconName" [size]="iconSize"></app-icon>
        {{ title }}
      </h2>
      @if (subtitle) {
      <p class="text-base-content/70 text-sm mt-2">{{ subtitle }}</p>
      }
    </div>
  `,
  imports: [IconComponent],
})
export class FormHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() iconName: string = 'EDIT';
  @Input() iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string = 'xl';
}
