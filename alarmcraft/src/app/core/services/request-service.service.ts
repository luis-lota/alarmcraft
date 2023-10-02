import {
  HttpClient,
} from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  constructor(private httpClient: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url);
  }

  public post<T>(url: string, body?: any): Observable<T> {
    return this.httpClient.post<T>(url, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url);
  }
}
