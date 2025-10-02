import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order.interface';

export enum OrderType {
  RADIOGRAPHY = 'RADIOGRAPHY',
  LABORATORY = 'LABORATORY',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const ORDER_TYPE_OPTIONS = [
  { value: OrderType.RADIOGRAPHY, label: 'Radiografía' },
  { value: OrderType.LABORATORY, label: 'Laboratorio' },
];

export const ORDER_STATUS_OPTIONS = [
  { value: OrderStatus.PENDING, label: 'Pendiente' },
  { value: OrderStatus.IN_PROGRESS, label: 'En Progreso' },
  { value: OrderStatus.COMPLETED, label: 'Completado' },
  { value: OrderStatus.CANCELLED, label: 'Cancelado' },
];

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Order[] = [
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
        specialty: 'DOCTOR',
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
        specialty: 'DOCTOR',
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
        specialty: 'DOCTOR',
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
      id: 4,
      orderType: 'RADIOGRAPHY',
      status: 'CANCELLED',
      orderDate: '2025-10-02T03:29:55.627Z',
      doctor: {
        id: 1,
        name: 'Dr. Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '0991234567',
        address: 'Calle 123, Ciudad, País',
        specialty: 'DOCTOR',
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
  ];
  order: Order = {
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
      specialty: 'DOCTOR',
    },
    patient: {
      id: 1,
      name: 'María González',
      email: 'maria.gonzalez@example.com',
      phone: '0991234567',
      address: 'Calle 456, Ciudad, País',
      notes: 'Alérgico a la penicilina',
    },
  };
}
