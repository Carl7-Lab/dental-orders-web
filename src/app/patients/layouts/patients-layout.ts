import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../shared/constants/navigation-path';
import MainNavbar from '../../shared/components/main-navbar/main-navbar';

@Component({
  selector: 'patients-layout',
  imports: [RouterOutlet, RouterLink, MainNavbar],
  templateUrl: './patients-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PatientsLayout {
  patientCreatePath = FULL_NAVIGATION_PATHS.PATIENTS_CREATE;
}
