import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FULL_NAVIGATION_PATHS } from '../../../../shared/constants/navigation-path';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../../shared/components/pagination/pagination.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import LoadingStateComponent from '../../../../shared/components/loading-state/loading-state.component';
import ErrorStateComponent from '../../../../shared/components/error-state/error-state.component';
import EmptyStateComponent from '../../../../shared/components/empty-state/empty-state.component';
import PaginationComponent from '../../../../shared/components/pagination/pagination';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'users-page',
  imports: [
    RouterLink,
    PageHeaderComponent,
    LoadingStateComponent,
    ErrorStateComponent,
    EmptyStateComponent,
    PaginationComponent,
    IconComponent,
  ],
  templateUrl: './users-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsersPage {
  private usersService = inject(UsersService);
  private paginationService = inject(PaginationService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  fullNavigationPaths = FULL_NAVIGATION_PATHS;

  tableHeads = signal<string[]>(['Nombre', 'Email', 'Teléfono', 'Dirección']);

  usersResource = rxResource({
    params: () => ({
      page: this.paginationService.currentPage(),
      limit: this.paginationService.itemsPerPage(),
    }),
    stream: () =>
      this.usersService.getUsers({
        page: this.paginationService.currentPage(),
        limit: this.paginationService.itemsPerPage(),
      }),
  });

  userUpdatePath = FULL_NAVIGATION_PATHS.USERS_UPDATE;
  usersListPath = FULL_NAVIGATION_PATHS.USERS_LIST;
  usersCreatePath = FULL_NAVIGATION_PATHS.USERS_CREATE;

  navigateToUsersCreate(): void {
    this.router.navigate([this.usersCreatePath]);
  }
}
