import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private route = inject(ActivatedRoute);

  currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => (params.get('page') ? parseInt(params.get('page')!) : 1)),
      map((page) => (isNaN(page) ? 1 : page))
    ),
    { initialValue: 1 }
  );
  itemsPerPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => (params.get('limit') ? parseInt(params.get('limit')!) : 10)),
      map((limit) => (isNaN(limit) ? 10 : limit))
    ),
    { initialValue: 10 }
  );
}
