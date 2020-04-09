import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';

import { VisitationsService, Visitation } from '../../shared/visitations.service';
import { LocationsService, Location } from '~/app/shared/locations.service';

@Component({
    selector: 'ItemDetail',
    templateUrl: './item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
    item: Visitation;

    constructor(
        private _data: VisitationsService,
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions,
        private locationsService: LocationsService
    ) { }

    ngOnInit(): void {
        const id = +this._route.snapshot.params.id;
        this.item = this._data.getVisitation(id);
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }

    getLocation(id: number): Location {
        return this.locationsService.getLocation(id);
    }
}
