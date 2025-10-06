import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../constants/navigation-path';
import { AuthService, AuthStatus } from '../../../auth/services/auth.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'main-navbar',
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './main-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainNavbar {
  authService = inject(AuthService);
  authStatus = AuthStatus;

  ordersPath = FULL_NAVIGATION_PATHS.ORDERS_LIST;
  patientsPath = FULL_NAVIGATION_PATHS.PATIENTS_LIST;
  doctorsPath = FULL_NAVIGATION_PATHS.DOCTORS_LIST;
}
