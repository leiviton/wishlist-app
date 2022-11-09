import {ErrorHandler, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment} from '../../environments/environment';

import {Router} from '@angular/router';

@Injectable()
export class AppHttpService {
  protected url: string;
  protected bodyRequest:any;
  modalReference: any;
  closeResult = '';

  request() {
    return this.http;
  }

  constructor(protected http: HttpClient, protected router: Router) {
    this.url = environment.serverUrl;
  }

  setAccessToken() {
    let token = localStorage.getItem('token');
    //this.header = new HttpHeaders({'Authorization': 'Bearer ' + token, 'Accept': 'application/json'});
  }

  builder(resource: string) {
    this.url = environment.serverUrl;
    return this;
  }

  list(options: any = {}): Promise<any> {
    let url = this.url;
    if (options.filters !== undefined) {
      url = url + '?';
      let filters = options.filters;
      let where = [];
      filters.forEach((item: any, index: any) => {
        let field = Object.keys(item)[0];
        let value = item[field];
        where.push({field: value});
        url = url + 'where[' + field + ']=' + value + '&';
      });
      let observable = this.http.get(url);
      return this.toPromise(observable);
    } else {
      let observable = this.http.get(url,);
      return this.toPromise(observable);
    }
  }

  search(search: string): Promise<any> {
    let observable = this.http.get(this.url + '?value=' + search);
    return this.toPromise(observable);
  }

  view(id: number, url: string, include: string = ''): Promise<any> {
    let observable = this.http.get(this.url + url + '/' + id + include);
    return this.toPromise(observable);
  }

  update(id: number, data: object): Promise<any> {
    let observable = this.http.put(this.url  + '/' + id, data);
    return this.toPromise(observable);
  }

  insert(data: object): Promise<any> {
    let observable = this.http.post(this.url, data);
    return this.toPromise(observable);
  }

  delete(id: number): Promise<any> {
    let observable = this.http.delete(this.url + '/' + id);
    return this.toPromise(observable);
  }
  deleteImage(): Promise<any> {
    const observable = this.http.delete(this.url);
    return this.toPromise(observable);
  }

  protected toPromise(request: any) {
    return request.toPromise()
      .then((res: any) => {
        return res || {}
      })
      .catch((err: any) => {
        let message = 'Algo deu errado, informe o erro ' + err.status + ' ao administrador';
        switch (err.status) {
          case 401:
            message = 'Você não tem permissão para acessar, informe um usuario e senha validos';
            localStorage.clear();
            break;
          case 403:
            message = err.error.error_description;
            break;
          case 404:
            break;
        }
      });
  }
}