import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'page-header',
  standalone: true,
  template: `
    <div class="text-center mb-8">
      <div
        class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
      >
        <app-icon [name]="iconName" [size]="iconSize"></app-icon>
      </div>
      <h1 class="text-4xl font-bold text-base-content mb-2">{{ title }}</h1>
      @if (subtitle) {
      <p class="text-base-content/70 text-lg">{{ subtitle }}</p>
      }
    </div>
  `,
  imports: [IconComponent],
})
export class PageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() iconName: string = 'DOCUMENT';
  @Input() iconSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string = '2xl';
}
