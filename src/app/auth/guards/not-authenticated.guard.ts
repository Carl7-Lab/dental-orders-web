import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { JwtService } from '../services/jwt.service';

export const NotAuthenticatedGuard: CanMatchFn = async (route: Route, segments: UrlSegment[]) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return true;
  }

  const isAuthenticated = jwtService.isTokenExpired(refreshToken);

  if (!isAuthenticated) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};
