import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient.interface';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  patients: Patient[] = [
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
  ];
  patient: Patient | null = {
    id: 1,
    name: 'María González',
    email: 'maria.gonzalez@example.com',
    phone: '0991234567',
    address: 'Calle 456, Ciudad, País',
    notes: 'Alérgico a la penicilina',
  };
}
