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
    visitation: Visitation;
    constructor(
        private _data: VisitationsService,
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        const id = +this._route.snapshot.params.id;
        this._data.getVisitationById(id).subscribe(
            (data) => {
                this.visitation = data;
            },
            (error) => console.error(error)
        );
    }

    getLocationName() {
        if (this.visitation === undefined || this.visitation.location === undefined) {
            return '';
        }

        return this.visitation.location.name;
    }
    getlocationAddress() {
        if (this.visitation === undefined || this.visitation.location === undefined) {
            return '';
        }

        return this.visitation.location.adress;
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }
}
