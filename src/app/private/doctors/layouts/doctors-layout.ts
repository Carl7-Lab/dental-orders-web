import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';

@Component({
  selector: 'doctors-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './doctors-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DoctorsLayout {
  doctorCreatePath = FULL_NAVIGATION_PATHS.DOCTORS_CREATE;
}
