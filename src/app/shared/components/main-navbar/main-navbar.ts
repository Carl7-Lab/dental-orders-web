import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../constants/navigation-path';
import { IconComponent } from '../icon/icon.component';
import { AuthService, AuthStatus } from '../../../public/auth/services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'main-navbar',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './main-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainNavbar {
  authService = inject(AuthService);
  router = inject(Router);
  toastService = inject(ToastService);
  authStatus = AuthStatus;

  dashboardPath = FULL_NAVIGATION_PATHS.DASHBOARD;

  menuItems = [
    {
      label: 'Clínicas',
      path: FULL_NAVIGATION_PATHS.CLINICS_LIST,
    },
    {
      label: 'Pacientes',
      path: FULL_NAVIGATION_PATHS.PATIENTS_LIST,
    },
    {
      label: 'Usuarios',
      path: FULL_NAVIGATION_PATHS.USERS_LIST,
    },
  ];

  logout() {
    this.authService.logout();
    this.router.navigateByUrl(FULL_NAVIGATION_PATHS.AUTH_SIGN_IN);
  }

  changePassword() {
    this.router.navigateByUrl(FULL_NAVIGATION_PATHS.USERS_CHANGE_PASSWORD);
  }
}
