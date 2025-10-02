import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../constants/navigation-path';

@Component({
  selector: 'main-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainNavbar {
  ordersPath = FULL_NAVIGATION_PATHS.ORDERS_LIST;
  patientsPath = FULL_NAVIGATION_PATHS.PATIENTS_LIST;
  doctorsPath = FULL_NAVIGATION_PATHS.DOCTORS_LIST;
}
