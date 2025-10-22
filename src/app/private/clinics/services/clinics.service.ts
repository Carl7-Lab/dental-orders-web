import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Clinic, ClinicFilterParams, ClinicsListResponse } from '../interfaces/clinic.interface';
import { UrlHelperService } from '../../../shared/services/url-helper.service';
import { catchError, Observable, of, tap } from 'rxjs';

const API_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ClinicsService {
  private http = inject(HttpClient);
  private urlHelper = inject(UrlHelperService);

  private clinicsCache = new Map<string, ClinicsListResponse>();
  private clinicCache = new Map<string, Clinic>();

  getClinics(params: ClinicFilterParams): Observable<ClinicsListResponse> {
    const key = JSON.stringify(params);
    if (this.clinicsCache.has(key)) {
      return of(this.clinicsCache.get(key)!);
    }

    const url = this.urlHelper.buildUrl(`${API_URL}/clinics`, params);

    return this.http.get<ClinicsListResponse>(url).pipe(
      tap((clinics) => {
        this.clinicsCache.set(key, clinics);
      }),
      catchError((error: any) => {
        console.error('Error al obtener las clínicas:', error);
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

  getClinic(clinicId: number): Observable<Clinic> {
    const key = `clinic-${clinicId}`;
    if (this.clinicCache.has(key)) {
      return of(this.clinicCache.get(key)!);
    }

    return this.http
      .get<Clinic>(`${API_URL}/clinics/${clinicId}`)
      .pipe(tap((clinic) => this.clinicCache.set(key, clinic)));
  }

  createClinic(clinic: Clinic): Observable<Clinic> {
    return this.http.post<Clinic>(`${API_URL}/clinics`, clinic).pipe(
      tap((response) => {
        this.clinicCache.set(`clinic-${response.id}`, response);
        this.clinicsCache.clear();
      })
    );
  }

  updateClinic(clinicId: number, clinic: Clinic): Observable<Clinic> {
    return this.http.patch<Clinic>(`${API_URL}/clinics/${clinicId}`, clinic).pipe(
      tap((response) => {
        this.clinicCache.set(`clinic-${response.id}`, response);
        this.clinicsCache.clear();
      })
    );
  }
}
