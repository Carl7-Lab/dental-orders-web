import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Patient,
  PatientFilterParams,
  PatientsListResponse,
} from '../interfaces/patient.interface';
import { catchError, Observable, of, tap } from 'rxjs';
import { UrlHelperService } from '../../../shared/services/url-helper.service';

const API_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private http = inject(HttpClient);
  private urlHelper = inject(UrlHelperService);

  private patientsCache = new Map<string, PatientsListResponse>();
  private patientCache = new Map<string, Patient>();

  getPatients(params: PatientFilterParams): Observable<PatientsListResponse> {
    const key = JSON.stringify(params);
    if (this.patientsCache.has(key)) {
      return of(this.patientsCache.get(key)!);
    }

    const url = this.urlHelper.buildUrl(`${API_URL}/patients`, params);

    return this.http.get<PatientsListResponse>(url).pipe(
      tap((patients) => this.patientsCache.set(key, patients)),
      catchError((error: any) => {
        console.error('Error al obtener los pacientes:', error);
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

  getPatient(patientId: number): Observable<Patient> {
    const key = `patient-${patientId}`;
    if (this.patientCache.has(key)) {
      return of(this.patientCache.get(key)!);
    }

    return this.http
      .get<Patient>(`${API_URL}/patients/${patientId}`)
      .pipe(tap((patient) => this.patientCache.set(key, patient)));
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${API_URL}/patients`, patient).pipe(
      tap((response) => {
        this.patientCache.set(`patient-${response.id}`, response);
        this.patientsCache.clear();
      })
    );
  }

  updatePatient(patientId: number, patient: Patient): Observable<Patient> {
    return this.http.patch<Patient>(`${API_URL}/patients/${patientId}`, patient).pipe(
      tap((response) => {
        this.patientCache.set(`patient-${response.id}`, response);
        this.patientsCache.clear();
      })
    );
  }
}
