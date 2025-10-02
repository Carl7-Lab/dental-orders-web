import { Routes } from '@angular/router';
import { NAVIGATION_PATHS } from './constants/navigation-path';
import AuthLayout from '../auth/layouts/auth-layout';
import SignInPage from '../auth/pages/signin-page/signin-page';
import SignUpPage from '../auth/pages/signup-page/signup-page';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: NAVIGATION_PATHS.AUTH_SIGN_IN, pathMatch: 'full' },
      { path: NAVIGATION_PATHS.AUTH_SIGN_IN, component: SignInPage },
      { path: NAVIGATION_PATHS.AUTH_SIGN_UP, component: SignUpPage },
    ],
  },
];

export default authRoutes;
