import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { ClinicsService } from '../../services/clinics.service';
import { PaginationService } from '../../../../shared/components/pagination/pagination.service';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import LoadingStateComponent from '../../../../shared/components/loading-state/loading-state.component';
import ErrorStateComponent from '../../../../shared/components/error-state/error-state.component';
import EmptyStateComponent from '../../../../shared/components/empty-state/empty-state.component';
import PaginationComponent from '../../../../shared/components/pagination/pagination';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'clinics-page',
  imports: [
    CommonModule,
    RouterLink,
    PageHeaderComponent,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent,
    PaginationComponent,
    IconComponent,
  ],
  templateUrl: './clinics-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ClinicsPage {
  private clinicsService = inject(ClinicsService);
  private paginationService = inject(PaginationService);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;
  clinicsCreatePath = FULL_NAVIGATION_PATHS.CLINICS_CREATE;
  clinicsUpdatePath = FULL_NAVIGATION_PATHS.CLINICS_UPDATE;

  tableHeads = signal<string[]>(['Nombre', 'Teléfono', 'Email', 'Dirección']);

  clinicsResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage(),
      limit: this.paginationService.itemsPerPage(),
    }),
    stream: () =>
      this.clinicsService.getClinics({
        page: this.paginationService.currentPage(),
        limit: this.paginationService.itemsPerPage(),
      }),
  });

  navigateToClinicCreate(): void {
    this.router.navigate([this.clinicsCreatePath]);
  }
}
