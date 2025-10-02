import { Routes } from '@angular/router';
import NotFoundPage from './pages/not-found/not-found-page';
import OrdersPage from '../orders/pages/orders/orders-page';
import PatientsPage from '../patients/pages/patients/patients-page';
import DoctorsPage from '../doctors/pages/doctors/doctors-page';
import { NAVIGATION_PATHS } from './constants/navigation-path';
import PatientsLayout from '../patients/layouts/patients-layout';
import DoctorsLayout from '../doctors/layouts/doctors-layout';
import OrdersLayout from '../orders/layouts/orders-layout';

export const frontRoutes: Routes = [
  {
    path: '',
    component: OrdersLayout,
    children: [
      {
        path: '',
        redirectTo: NAVIGATION_PATHS.ORDERS,
        pathMatch: 'full',
      },
      {
        path: NAVIGATION_PATHS.ORDERS,
        component: OrdersPage,
      },
    ],
  },
  {
    path: NAVIGATION_PATHS.PATIENTS,
    component: PatientsLayout,
    children: [
      {
        path: '',
        component: PatientsPage,
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
      },
    ],
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];

export default frontRoutes;
