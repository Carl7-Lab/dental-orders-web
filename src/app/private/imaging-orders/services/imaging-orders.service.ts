import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UrlHelperService } from '../../../shared/services/url-helper.service';
import {
  ImagingOrder,
  ImagingOrderFilterParams,
  ImagingOrderListResponse,
} from '../interfaces/imaging-order.interface';
import { catchError, Observable, of, tap } from 'rxjs';

const API_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ImagingOrdersService {
  private http = inject(HttpClient);
  private urlHelper = inject(UrlHelperService);

  private imagingOrdersCache = new Map<string, ImagingOrderListResponse>();
  private imagingOrderCache = new Map<string, ImagingOrder>();

  getImagingOrders(params: ImagingOrderFilterParams): Observable<ImagingOrderListResponse> {
    const key = JSON.stringify(params);
    if (this.imagingOrdersCache.has(key)) {
      return of(this.imagingOrdersCache.get(key)!);
    }

    const url = this.urlHelper.buildUrl(`${API_URL}/imaging-orders`, params);

    return this.http.get<ImagingOrderListResponse>(url).pipe(
      tap((imagingOrders) => {
        this.imagingOrdersCache.set(key, imagingOrders);
      }),
      catchError((error: any) => {
        console.error('Error al obtener las órdenes de imagen:', error);
        return of({
          data: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          },
        });
      })
    );
  }

  getImagingOrder(imagingOrderId: number): Observable<ImagingOrder> {
    const cacheKey = `imaging-order-${imagingOrderId}`;
    if (this.imagingOrderCache.has(cacheKey)) {
      return of(this.imagingOrderCache.get(cacheKey)!);
    }

    return this.http.get<ImagingOrder>(`${API_URL}/imaging-orders/${imagingOrderId}`).pipe(
      tap((imagingOrder) => {
        this.imagingOrderCache.set(cacheKey, imagingOrder);
      })
    );
  }

  createImagingOrder(imagingOrder: ImagingOrder): Observable<ImagingOrder> {
    return this.http.post<ImagingOrder>(`${API_URL}/imaging-orders`, imagingOrder).pipe(
      tap((imagingOrder) => {
        this.imagingOrderCache.set(`imaging-order-${imagingOrder.id}`, imagingOrder);
      })
    );
  }

  updateImagingOrder(imagingOrderId: number, imagingOrder: ImagingOrder): Observable<ImagingOrder> {
    return this.http
      .patch<ImagingOrder>(`${API_URL}/imaging-orders/${imagingOrderId}`, imagingOrder)
      .pipe(
        tap((imagingOrder) => {
          this.imagingOrderCache.set(`imaging-order-${imagingOrder.id}`, imagingOrder);
        })
      );
  }
}
