import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink, IconComponent],
  templateUrl: './pagination.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  total = input.required<number>();
  limit = input.required<number>();
  hasNextPage = computed(() => this.currentPage() < this.totalPages());
  hasPrevPage = computed(() => this.currentPage() > 1);

  pageChange = output<number>();

  activePage = linkedSignal(this.currentPage);

  getVisiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: (number | string)[] = [];

    if (total <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current <= 3) {
        // Show pages 1-4, ellipsis, last page
        for (let i = 2; i <= Math.min(4, total - 1); i++) {
          pages.push(i);
        }
        if (total > 4) {
          pages.push('...');
        }
        if (total > 1) {
          pages.push(total);
        }
      } else if (current >= total - 2) {
        // Show first page, ellipsis, last 4 pages
        if (total > 4) {
          pages.push('...');
        }
        for (let i = Math.max(2, total - 3); i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Show first page, ellipsis, current-1, current, current+1, ellipsis, last page
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      }
    }

    return pages;
  });

  getStartItem = computed(() => {
    return (this.currentPage() - 1) * this.limit() + 1;
  });

  getEndItem = computed(() => {
    return Math.min(this.currentPage() * this.limit(), this.total());
  });

  getPagesList = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });
}
