import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';

@Component({
  selector: 'orders-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './orders-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrdersLayout {
  orderCreatePath = FULL_NAVIGATION_PATHS.ORDERS_CREATE;
}
