import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlHelperService {
  buildQueryParams(params: Record<string, any>): string {
    const queryParams = Object.entries(params)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => {
        if (value instanceof Date) {
          value = value.toISOString();
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join('&');

    return queryParams ? `?${queryParams}` : '';
  }

  buildUrl(baseUrl: string, params?: Record<string, any>): string {
    if (!params) return baseUrl;
    const queryString = this.buildQueryParams(params);
    return `${baseUrl}${queryString}`;
  }
}
