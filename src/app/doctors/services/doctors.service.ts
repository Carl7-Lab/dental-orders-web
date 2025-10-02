import { Injectable } from '@angular/core';
import { Doctor } from '../interfaces/doctor.interface';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Juan Pérez',
      email: 'juan.perez@example.com',
      phone: '0991234567',
      address: 'Calle 123, Ciudad, País',
    },
    {
      id: 2,
      name: 'Dr. María González',
      email: 'maria.gonzalez@example.com',
      phone: '0991234567',
      address: 'Calle 123, Ciudad, País',
    },
    {
      id: 3,
      name: 'Dr. Juan Pérez',
      email: 'juan.perez@example.com',
      phone: '0991234567',
      address: 'Calle 123, Ciudad, País',
    },
  ];
  doctor: Doctor | null = {
    id: 1,
    name: 'Dr. Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '0991234567',
    address: 'Calle 123, Ciudad, País',
  };
}
