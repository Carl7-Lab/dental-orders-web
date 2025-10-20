import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DateFormatterService } from '../../../../shared/services/date-formatter.service';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { OrderService } from '../../services/order.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'orders-page',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './orders-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrdersPage implements OnInit {
  navigationPaths = FULL_NAVIGATION_PATHS;
  dateFormatterService = DateFormatterService;
  orderService = inject(OrderService);
  orders = this.orderService.orders;
  router = inject(Router);
  currentRoute = signal<string>('');

  tableHeads = signal<string[]>([
    'No.',
    'Tipo de Orden',
    'Estado',
    'Paciente',
    'Doctor',
    'Fecha',
    'Acciones',
  ]);

  ngOnInit(): void {
    this.currentRoute.set(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
      });
  }

  orderUpdatePath = FULL_NAVIGATION_PATHS.ORDERS_UPDATE;
}
