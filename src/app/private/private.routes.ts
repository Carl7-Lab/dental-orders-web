import { Routes } from '@angular/router';
import { NAVIGATION_PATHS } from '../shared/constants/navigation-path';
import DashboardPage from './dashboard/page/dashboard-page';
import UsersPage from './users/pages/users-list/users-page';
import { CreateUser } from './users/pages/user-create/user-create';
import { UpdateUser } from './users/pages/user-update/user-update';
import { ChangePasswordPage } from './users/pages/change-password/change-password';

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
