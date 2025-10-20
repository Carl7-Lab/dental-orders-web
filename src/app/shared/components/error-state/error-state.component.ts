import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-error-state',
  imports: [IconComponent],
  template: `
    <div class="alert alert-error shadow-lg">
      <app-icon name="EXCLAMATION_CIRCLE" size="lg"></app-icon>
      <div>
        <h3 class="font-bold">{{ title() }}</h3>
        <div class="text-sm">{{ message() }}</div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ErrorStateComponent {
  title = input<string>('Error');
  message = input<string>('Ha ocurrido un error inesperado');
}
