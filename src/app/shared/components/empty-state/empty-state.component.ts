import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-empty-state',
  imports: [IconComponent],
  template: `
    <div class="text-center py-20">
      <app-icon [name]="iconName()" size="3xl" class="text-base-content/30 mb-4"></app-icon>
      <h3 class="text-2xl font-semibold text-base-content mb-2">{{ title() }}</h3>
      <p class="text-base-content/70 mb-6">{{ message() }}</p>
      @if (showActionButton()) {
      <button class="btn btn-primary" (click)="onActionClick.emit()">
        <app-icon [name]="actionIconName()" size="md"></app-icon>
        {{ actionButtonText() }}
      </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmptyStateComponent {
  iconName = input<string>('EXCLAMATION_CIRCLE');
  title = input<string>('No hay datos');
  message = input<string>('No se encontraron elementos para mostrar');
  showActionButton = input<boolean>(false);
  actionButtonText = input<string>('Crear nuevo');
  actionIconName = input<string>('PLUS');

  onActionClick = output<void>();
}
