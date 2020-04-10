import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private baseUrl = 'https://hazardtrackerserver20200410132817.azurewebsites.net/';

    getBaseUrl(): string {
        return this.baseUrl;
    }
}
