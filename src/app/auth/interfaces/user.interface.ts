import { Role } from '../services/auth.service';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: Role;
}
