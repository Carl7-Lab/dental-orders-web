import { inject, Injectable } from '@angular/core';
import { User, UserFilterParams, UsersListResponse } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UrlHelperService } from '../../../shared/services/url-helper.service';

const API_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private urlHelper = inject(UrlHelperService);

  private usersCache = new Map<string, UsersListResponse>();
  private userCache = new Map<string, User>();

  getUsers(params: UserFilterParams): Observable<UsersListResponse> {
    const key = JSON.stringify(params);
    if (this.usersCache.has(key)) {
      return of(this.usersCache.get(key)!);
    }

    const url = this.urlHelper.buildUrl(`${API_URL}/users`, params);

    return this.http.get<UsersListResponse>(url).pipe(
      tap((users) => {
        this.usersCache.set(key, users);
      }),
      catchError((error: any) => {
        console.error('Error al obtener los usuarios:', error);
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

  getUser(userId: number): Observable<User> {
    const cacheKey = `user-${userId}`;
    if (this.userCache.has(cacheKey)) {
      return of(this.userCache.get(cacheKey)!);
    }

    return this.http.get<User>(`${API_URL}/users/${userId}`).pipe(
      tap((user) => {
        this.userCache.set(cacheKey, user);
      })
    );
  }

  createUser(user: User): Observable<User> {
    if (user.phone === '') {
      user = { ...user, phone: undefined };
    }

    return this.http.post<User>(`${API_URL}/users`, user).pipe(
      tap((response) => {
        this.userCache.set(`user-${response.id}`, response);
        this.usersCache.clear();
      })
    );
  }

  updateUser(id: number, user: User): Observable<User> {
    if (user.phone === '') {
      user = { ...user, phone: undefined };
    }

    return this.http.patch<User>(`${API_URL}/users/${id}`, user).pipe(
      tap((response) => {
        this.userCache.set(`user-${response.id}`, response);
        this.usersCache.clear();
      })
    );
  }

  updateUserPassword(id: number, password: string): Observable<User> {
    return this.http.patch<User>(`${API_URL}/users/${id}`, { password }).pipe(
      tap((response) => {
        this.userCache.set(`user-${response.id}`, response);
        this.usersCache.clear();
      })
    );
  }
}
