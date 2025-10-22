import {
  PaginatedResponse,
  PaginationParams,
} from '../../../shared/interfaces/pagination.interface';

export interface Patient {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
}

export interface PatientFilterParams extends PaginationParams {}

export type PatientsListResponse = PaginatedResponse<Patient>;
