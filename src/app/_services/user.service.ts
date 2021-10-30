import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = `${environment.apiUrl}/users`;


@Injectable({ providedIn: 'root' })
export class UserService {


    users$: Observable<User[]>;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(baseUrl);
    }

    getById(id: string) {

        return this.http.get<User>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(`${baseUrl}/register`, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}