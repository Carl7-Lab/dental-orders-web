import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { DoctorService } from '../../services/doctors.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'doctors-page',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './doctors-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DoctorsPage implements OnInit {
  navigationPaths = FULL_NAVIGATION_PATHS;
  doctorService = inject(DoctorService);
  doctors = this.doctorService.doctors;
  router = inject(Router);
  currentRoute = signal<string>('');

  tableHeads = signal<string[]>([
    'No.',
    'Nombre',
    'Email',
    'Teléfono',
    'Dirección',
    'Especialidad',
  ]);

  ngOnInit(): void {
    this.currentRoute.set(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
      });
  }

  doctorUpdatePath = FULL_NAVIGATION_PATHS.DOCTORS_UPDATE;
}
