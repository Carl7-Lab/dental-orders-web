import { Routes } from '@angular/router';
import OrdersPage from '../orders/pages/orders-list/orders-page';
import PatientsPage from '../patients/pages/patients-list/patients-page';
import DoctorsPage from '../doctors/pages/doctors-list/doctors-page';
import { NAVIGATION_PATHS } from './constants/navigation-path';
import PatientsLayout from '../patients/layouts/patients-layout';
import DoctorsLayout from '../doctors/layouts/doctors-layout';
import OrdersLayout from '../orders/layouts/orders-layout';
import { CreateOrder } from '../orders/pages/order-create/order-create';
import { UpdateOrder } from '../orders/pages/order-update/order-update';
import { CreateDoctor } from '../doctors/pages/doctor-create/doctor-create';
import { UpdateDoctor } from '../doctors/pages/doctor-update/doctor-update';
import { CreatePatient } from '../patients/pages/patient-create/patient-create';
import { UpdatePatient } from '../patients/pages/patient-update/patient-update';
import DashboardPage from '../dashboard/page/dashboard-page';

export const publicRoutes: Routes = [
  {
    path: NAVIGATION_PATHS.PATIENTS,
    component: PatientsLayout,
    children: [
      {
        path: '',
        component: PatientsPage,
        children: [
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
    ],
  },
  {
    path: NAVIGATION_PATHS.DOCTORS,
    component: DoctorsLayout,
    children: [
      {
        path: '',
        component: DoctorsPage,
        children: [
          {
            path: NAVIGATION_PATHS.DOCTORS_CREATE,
            component: CreateDoctor,
          },
          {
            path: NAVIGATION_PATHS.DOCTORS_UPDATE,
            component: UpdateDoctor,
          },
        ],
      },
    ],
  },
  {
    path: NAVIGATION_PATHS.ORDERS,
    component: OrdersLayout,
    children: [
      {
        path: '',
        component: OrdersPage,
        children: [
          {
            path: NAVIGATION_PATHS.ORDERS_CREATE,
            component: CreateOrder,
          },
          {
            path: NAVIGATION_PATHS.ORDERS_UPDATE,
            component: UpdateOrder,
          },
        ],
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
