import { Routes } from '@angular/router';
import { NAVIGATION_PATHS } from '../shared/constants/navigation-path';
import DashboardPage from './dashboard/page/dashboard-page';
import UsersPage from './users/pages/users-list/users-page';
import { CreateUser } from './users/pages/user-create/user-create';
import { UpdateUser } from './users/pages/user-update/user-update';
import { ChangePasswordPage } from './users/pages/change-password/change-password';
import PatientsPage from './patients/pages/patients-list/patients-page';
import { CreatePatient } from './patients/pages/patient-create/patient-create';
import { UpdatePatient } from './patients/pages/patient-update/patient-update';
import ClinicsPage from './clinics/pages/clinics-list/clinics-page';
import { CreateClinic } from './clinics/pages/clinic-create/clinic-create';
import { UpdateClinic } from './clinics/pages/clinic-update/clinic-update';

export const publicRoutes: Routes = [
  {
    path: NAVIGATION_PATHS.USERS,
    children: [
      {
        path: '',
        component: UsersPage,
      },
      {
        path: NAVIGATION_PATHS.USERS_CREATE,
        component: CreateUser,
      },
      {
        path: NAVIGATION_PATHS.USERS_UPDATE,
        component: UpdateUser,
      },
      {
        path: NAVIGATION_PATHS.USERS_CHANGE_PASSWORD,
        component: ChangePasswordPage,
      },
    ],
  },
  {
    path: NAVIGATION_PATHS.PATIENTS,
    children: [
      {
        path: '',
        component: PatientsPage,
      },
      {
        path: NAVIGATION_PATHS.PATIENTS_CREATE,
        component: CreatePatient,
      },
      {
        path: NAVIGATION_PATHS.PATIENTS_UPDATE,
        component: UpdatePatient,
      },
    ],
  },
  {
    path: NAVIGATION_PATHS.CLINICS,
    children: [
      {
        path: '',
        component: ClinicsPage,
      },
      {
        path: NAVIGATION_PATHS.CLINICS_CREATE,
        component: CreateClinic,
      },
      {
        path: NAVIGATION_PATHS.CLINICS_UPDATE,
        component: UpdateClinic,
      },
    ],
  },
  {
    path: '',
    redirectTo: NAVIGATION_PATHS.DASHBOARD,
    pathMatch: 'full',
  },
  {
    path: NAVIGATION_PATHS.DASHBOARD,
    component: DashboardPage,
  },
];

export default publicRoutes;
