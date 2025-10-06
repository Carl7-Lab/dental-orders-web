import { Routes } from '@angular/router';
import { NAVIGATION_PATHS } from './shared/constants/navigation-path';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';

export const routes: Routes = [
  {
    path: NAVIGATION_PATHS.AUTH,
    loadChildren: () => import('./shared/auth.routes'),
    canMatch: [NotAuthenticatedGuard],
  },
  {
    path: '',
    loadChildren: () => import('./shared/dental-order.routes'),
  },
  {
    path: '**',
    loadComponent: () => import('./shared/pages/not-found/not-found-page'),
  },
];
