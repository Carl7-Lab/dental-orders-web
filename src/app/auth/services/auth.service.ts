import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { JwtService } from './jwt.service';
import { catchError, map, Observable, of, tap } from 'rxjs';

export enum AuthStatus {
  CHECKING = 'checking',
  AUTHENTICATED = 'authenticated',
  NOT_AUTHENTICATED = 'notAuthenticated',
}

export enum Role {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  INTERN = 'intern',
}

const API_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>(AuthStatus.CHECKING);
  private _user = signal<User | null>(null);
  private _accessToken = signal<string | null>(null);
  private _refreshToken = signal<string | null>(null);

  private http = inject(HttpClient);
  private jwtService = inject(JwtService);

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === AuthStatus.CHECKING) {
      return AuthStatus.CHECKING;
    }

    if (this._user()) {
      return AuthStatus.AUTHENTICATED;
    }

    return AuthStatus.NOT_AUTHENTICATED;
  });

  user = computed<User | null>(() => this._user());
  accessToken = computed<string | null>(() => this._accessToken());
  refreshToken = computed<string | null>(() => this._refreshToken());

  login({ email, password }: { email: string; password: string }): Observable<boolean> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/local/signin`, { email, password }).pipe(
      tap((response) => {
        this._authStatus.set(AuthStatus.AUTHENTICATED);
        this._accessToken.set(response.accessToken);
        this._refreshToken.set(response.refreshToken);

        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);

        const user = this.jwtService.getUserFromToken(response.accessToken);
        if (user) {
          this._user.set(user);
        }
      }),
      map((_response) => {
        return true;
      }),
      catchError((_error) => {
        this.logout();
        return of(false);
      })
    );
  }

  logout() {
    this._user.set(null);
    this._accessToken.set(null);
    this._refreshToken.set(null);
    this._authStatus.set(AuthStatus.NOT_AUTHENTICATED);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
