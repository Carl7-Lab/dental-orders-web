import { Role } from '../../../public/auth/services/auth.service';
import {
  PaginatedResponse,
  PaginationParams,
} from '../../../shared/interfaces/pagination.interface';

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  role: Role;
}

export interface UserFilterParams extends PaginationParams {}

export type UsersListResponse = PaginatedResponse<User>;
