import { Routes } from '@angular/router';
import { NAVIGATION_PATHS } from './shared/constants/navigation-path';
import { NotAuthenticatedGuard } from './public/auth/guards/not-authenticated.guard';
import { IsAuthenticatedGuard } from './public/auth/guards/is-authenticated.guard';
import PrivateLayout from './private/layout/private-layout';

export const routes: Routes = [
  {
    path: NAVIGATION_PATHS.AUTH,
    loadChildren: () => import('./public/public.routes'),
    canMatch: [NotAuthenticatedGuard],
  },
  {
    path: NAVIGATION_PATHS.AUTHENTICATED,
    loadChildren: () => import('./private/private.routes'),
    component: PrivateLayout,
    canMatch: [IsAuthenticatedGuard],
  },
  {
    path: '',
    redirectTo: NAVIGATION_PATHS.AUTHENTICATED,
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('./shared/pages/not-found/not-found-page'),
  },
];
