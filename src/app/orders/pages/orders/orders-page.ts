import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateFormatterService } from '../../../shared/services/date-formatter.service';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';

@Component({
  selector: 'orders-page',
  imports: [RouterLink],
  templateUrl: './orders-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrdersPage {
  dateFormatterService = DateFormatterService;

  orders = signal<any[]>([
    {
      id: 1,
      orderType: 'RADIOGRAPHY',
      status: 'PENDING',
      orderDate: '2025-10-02T03:29:55.627Z',
      doctor: {
        id: 1,
        name: 'Dr. Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '0991234567',
        address: 'Calle 123, Ciudad, País',
        role: 'DOCTOR',
      },
      patient: {
        id: 1,
        name: 'María González',
        email: 'maria.gonzalez@example.com',
        phone: '0991234567',
        address: 'Calle 456, Ciudad, País',
        notes: 'Alérgico a la penicilina',
      },
    },
    {
      id: 2,
      orderType: 'RADIOGRAPHY',
      status: 'IN_PROGRESS',
      orderDate: '2025-10-02T03:29:55.627Z',
      doctor: {
        id: 1,
        name: 'Dr. Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '0991234567',
        address: 'Calle 123, Ciudad, País',
        role: 'DOCTOR',
      },
      patient: {
        id: 1,
        name: 'María González',
        email: 'maria.gonzalez@example.com',
        phone: '0991234567',
        address: 'Calle 456, Ciudad, País',
        notes: 'Alérgico a la penicilina',
      },
    },
    {
      id: 3,
      orderType: 'RADIOGRAPHY',
      status: 'COMPLETED',
      orderDate: '2025-10-02T03:29:55.627Z',
      doctor: {
        id: 1,
        name: 'Dr. Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '0991234567',
        address: 'Calle 123, Ciudad, País',
        role: 'DOCTOR',
      },
      patient: {
        id: 1,
        name: 'María González',
        email: 'maria.gonzalez@example.com',
        phone: '0991234567',
        address: 'Calle 456, Ciudad, País',
        notes: 'Alérgico a la penicilina',
      },
    },
    {
      id: 3,
      orderType: 'RADIOGRAPHY',
      status: 'CANCELLED',
      orderDate: '2025-10-02T03:29:55.627Z',
      doctor: {
        id: 1,
        name: 'Dr. Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '0991234567',
        address: 'Calle 123, Ciudad, País',
        role: 'DOCTOR',
      },
      patient: {
        id: 1,
        name: 'María González',
        email: 'maria.gonzalez@example.com',
        phone: '0991234567',
        address: 'Calle 456, Ciudad, País',
        notes: 'Alérgico a la penicilina',
      },
    },
  ]);

  tableHeads = signal<string[]>([
    'No.',
    'Tipo de Orden',
    'Estado',
    'Paciente',
    'Doctor',
    'Fecha',
    'Acciones',
  ]);

  orderUpdatePath = FULL_NAVIGATION_PATHS.ORDERS_UPDATE;
}
