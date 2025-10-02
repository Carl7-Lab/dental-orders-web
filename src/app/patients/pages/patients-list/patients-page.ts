import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FULL_NAVIGATION_PATHS } from '../../../shared/constants/navigation-path';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { PatientService } from '../../services/patients.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'patients-page',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './patients-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PatientsPage implements OnInit {
  navigationPaths = FULL_NAVIGATION_PATHS;
  patientService = inject(PatientService);
  patients = this.patientService.patients;
  router = inject(Router);
  currentRoute = signal<string>('');

  tableHeads = signal<string[]>([
    'No.',
    'Nombre',
    'Email',
    'Teléfono',
    'Dirección',
    'Notas',
    'Acciones',
  ]);

  ngOnInit(): void {
    this.currentRoute.set(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
      });
  }

  patientUpdatePath = FULL_NAVIGATION_PATHS.PATIENTS_UPDATE;
}
