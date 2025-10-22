import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PatientsService } from '../../services/patients.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../../shared/components/pagination/pagination.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import LoadingStateComponent from '../../../../shared/components/loading-state/loading-state.component';
import ErrorStateComponent from '../../../../shared/components/error-state/error-state.component';
import EmptyStateComponent from '../../../../shared/components/empty-state/empty-state.component';
import PaginationComponent from '../../../../shared/components/pagination/pagination';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'patients-page',
  imports: [
    RouterLink,
    PageHeaderComponent,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent,
    PaginationComponent,
    IconComponent,
  ],
  templateUrl: './patients-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PatientsPage {
  private patientsService = inject(PatientsService);
  private paginationService = inject(PaginationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;

  tableHeads = signal<string[]>(['Nombre', 'Email', 'Teléfono', 'Dirección']);

  patientsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage(),
      limit: this.paginationService.itemsPerPage(),
    }),
    stream: () =>
      this.patientsService.getPatients({
        page: this.paginationService.currentPage(),
        limit: this.paginationService.itemsPerPage(),
      }),
  });

  patientUpdatePath = FULL_NAVIGATION_PATHS.PATIENTS_UPDATE;
  patientsListPath = FULL_NAVIGATION_PATHS.PATIENTS_LIST;
  patientsCreatePath = FULL_NAVIGATION_PATHS.PATIENTS_CREATE;

  navigateToPatientsCreate(): void {
    this.router.navigate([this.patientsCreatePath]);
  }
}
