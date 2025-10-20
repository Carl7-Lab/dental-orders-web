import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';

export const IsAuthenticatedGuard: CanMatchFn = async (route: Route, segments: UrlSegment[]) => {
  const jwtService = inject(JwtService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    router.navigateByUrl(FULL_NAVIGATION_PATHS.AUTH_SIGN_IN);
    return false;
  }

  const isExpired = jwtService.isTokenExpired(refreshToken);

  if (isExpired || !authService.accessToken()) {
    const isAuthenticated = await firstValueFrom(authService.checkAuthStatus());
    if (!isAuthenticated) {
      router.navigateByUrl(FULL_NAVIGATION_PATHS.AUTH_SIGN_IN);
      return false;
    }
  }

  return true;
};
