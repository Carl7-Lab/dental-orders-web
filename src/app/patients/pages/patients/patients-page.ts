import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'patients-page',
  imports: [RouterLink],
  templateUrl: './patients-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PatientsPage {
  patients = signal<any[]>([
    {
      id: 1,
      name: 'María González',
      email: 'maria.gonzalez@example.com',
      phone: '0991234567',
      address: 'Calle 456, Ciudad, País',
      notes: 'Alérgico a la penicilina',
    },
    {
      id: 2,
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      phone: '0991234567',
      address: 'Calle 456, Ciudad, País',
      notes: 'Alérgico a la penicilina',
    },
    {
      id: 3,
      name: 'Ana López',
      email: 'ana.lopez@example.com',
      phone: '0991234567',
      address: 'Calle 456, Ciudad, País',
      notes: 'Alérgico a la penicilina',
    },
    {
      id: 4,
      name: 'Pedro García',
      email: 'pedro.garcia@example.com',
      phone: '0991234567',
      address: 'Calle 456, Ciudad, País',
      notes: 'Alérgico a la penicilina',
    },
  ]);

  tableHeads = signal<string[]>(['No.', 'Nombre', 'Email', 'Teléfono', 'Dirección', 'Notas']);

  patientUpdatePath = FULL_NAVIGATION_PATHS.PATIENTS_UPDATE;
}
