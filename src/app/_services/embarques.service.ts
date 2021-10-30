import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Receipts } from '@app/_models';


const baseUrl = `${environment.apiUrl}/Receipts`;


@Injectable({ providedIn: 'root' })
export class EmbarquesService {
    constructor(private http: HttpClient) { }

    getAll() {
        console.log(baseUrl);
        return this.http.get<Receipts[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Receipts>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}