import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'doctors-page',
  imports: [RouterLink],
  templateUrl: './doctors-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DoctorsPage {
  doctors = signal<any[]>([
    {
      id: 1,
      name: 'Dr. Juan Pérez',
      email: 'juan.perez@example.com',
      password: 'password123',
      phone: '0991234567',
      address: 'Calle 123, Ciudad, País',
      specialty: 'Ortodoncista',
    },
    {
      id: 2,
      name: 'Dr. María González',
      email: 'maria.gonzalez@example.com',
      password: 'password123',
      phone: '0991234567',
      address: 'Calle 123, Ciudad, País',
      specialty: 'Ortodoncista',
    },
    {
      id: 3,
      name: 'Dr. Juan Pérez',
      email: 'juan.perez@example.com',
      password: 'password123',
      phone: '0991234567',
      address: 'Calle 123, Ciudad, País',
      specialty: 'Ortodoncista',
    },
  ]);

  tableHeads = signal<string[]>([
    'No.',
    'Nombre',
    'Email',
    'Teléfono',
    'Dirección',
    'Especialidad',
  ]);

  doctorUpdatePath = FULL_NAVIGATION_PATHS.DOCTORS_UPDATE;
}
