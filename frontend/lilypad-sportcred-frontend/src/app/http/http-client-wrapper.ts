import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RawQueryParams {
  [param: string]: string | string[] | number | number[] | boolean | boolean[];
}

export interface QueryParams {
  [param: string]: string | string[];
}

@Injectable({ providedIn: 'root' })
export class HttpClientWrapper {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, queryParams?: RawQueryParams): Observable<T> {
    return this.httpClient.get<T>(environment.urlProcessor(url), {
      params: this.stringifyQueryParams(queryParams),
    });
  }

  post<T>(
    url: string,
    body: any | null,
    queryParams?: RawQueryParams
  ): Observable<T> {
    return this.httpClient.post<T>(environment.urlProcessor(url), body, {
      params: this.stringifyQueryParams(queryParams),
    });
  }

  patch<T>(
    url: string,
    body: any | null,
    queryParams?: RawQueryParams
  ): Observable<T> {
    return this.httpClient.patch<T>(environment.urlProcessor(url), body, {
      params: this.stringifyQueryParams(queryParams),
    });
  }

  delete<T>(url: string, queryParams?: RawQueryParams): Observable<T> {
    return this.httpClient.delete<T>(environment.urlProcessor(url), {
      params: this.stringifyQueryParams(queryParams),
    });
  }

  private stringifyQueryParams(rawQueryParams: RawQueryParams): QueryParams {
    if (rawQueryParams === undefined) {
      return undefined;
    }

    const result = {};
    for (const [key, value] of Object.entries(rawQueryParams)) {
      result[key] = value.toString();
    }
    return result;
  }
}
