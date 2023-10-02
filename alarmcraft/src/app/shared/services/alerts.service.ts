import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { RequestService } from 'src/app/core/services/request-service.service';

import { Alerts, RestResponse } from '../models/alerts';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  constructor(private requestService: RequestService) {}

  getAlerts(): Observable<RestResponse<Alerts>> {
    return this.requestService.post('https://api.todoist.com/sync/v9/sync/', {
      sync_token: '*',
      resource_types: ['projects', 'items'],
    });
  }

  getCompleteTaks(): Observable<RestResponse<Alerts>> {
    return this.requestService.get(
      'https://api.todoist.com/sync/v9/completed/get_all'
    );
  }

  deleteTask(id: string): Observable<RestResponse<Alerts>> {
    const url = 'https://api.todoist.com/rest/v2/tasks/';
    return this.requestService.delete(`${url}${id}`);
  }

  postTask(body: any): Observable<RestResponse<Alerts>> {
    const url = 'https://api.todoist.com/rest/v2/';
    return this.requestService.post(`${url}tasks`, body);
  }

  putTasks(body: any, id: string): Observable<RestResponse<Alerts>> {
    const url = 'https://api.todoist.com/rest/v2/';
    return this.requestService.post(`${url}tasks/${id}`, body);
  }

  putTaskToClose(id: string): Observable<RestResponse<Alerts>> {
    const url = 'https://api.todoist.com/rest/v2/';
    return this.requestService.post(`${url}tasks/${id}/close`);
  }

  putTaskReopen(id: string): Observable<RestResponse<Alerts>> {
    const url = 'https://api.todoist.com/rest/v2/';
    return this.requestService.post(`${url}tasks/${id}/reopen`);
  }
}
