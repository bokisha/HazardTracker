import { Injectable } from '@angular/core';

export interface Location {
    id: number;
    name: string;
    adress: string;
}

@Injectable({
    providedIn: 'root'
})
export class LocationsService {

    private items = new Array<Location>(
        {
            id: 1,
            name: 'Maxi',
            adress: 'Džona Kenedija 10, Beograd 11080, Serbia'
        },
        {
            id: 2,
            name: 'Maxi',
            adress: 'Narodnih heroja 30, Beograd 11070, Serbia'
        },
        {
            id: 3,
            name: 'Idea',
            adress: 'Bulevar Mihajla Pupina 181v, Novi Beograd 11070, Serbia'
        }
    );

    getLocations(): Array<Location> {
        return this.items;
    }

    getLocation(id: number): Location {
        return this.items.filter((item) => item.id === id)[0];
    }

    getLocationsByIds(ids: Array<number>): Array<Location> {
        return this.items.filter((item) => ids.indexOf(item.id) > -1);
    }
}
