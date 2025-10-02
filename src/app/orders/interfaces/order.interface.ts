import { Doctor } from '../../doctors/interfaces/doctor.interface';
import { Patient } from '../../patients/interfaces/patient.interface';

export interface Order {
  id: number;
  orderType: string;
  status: string;
  orderDate: string;
  doctor: Doctor;
  patient: Patient;
}
