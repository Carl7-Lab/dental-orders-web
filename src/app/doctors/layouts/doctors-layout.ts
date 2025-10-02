import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../shared/constants/navigation-path';
import MainNavbar from '../../shared/components/main-navbar/main-navbar';

@Component({
  selector: 'doctors-layout',
  imports: [RouterOutlet, RouterLink, MainNavbar],
  templateUrl: './doctors-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DoctorsLayout {
  doctorCreatePath = FULL_NAVIGATION_PATHS.DOCTORS_CREATE;
}
