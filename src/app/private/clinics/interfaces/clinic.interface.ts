import {
  PaginatedResponse,
  PaginationParams,
} from '../../../shared/interfaces/pagination.interface';

export interface Clinic {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface ClinicFilterParams extends PaginationParams {}

export type ClinicsListResponse = PaginatedResponse<Clinic>;
