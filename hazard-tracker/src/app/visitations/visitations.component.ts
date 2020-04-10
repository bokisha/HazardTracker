import { Component, OnInit } from '@angular/core';

import { LocationsService, Location } from '../shared/locations.service';
import { VisitationsService, Visitation } from '../shared/visitations.service';
import { SwipeGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { PageService } from '../shared/page.service';

@Component({
    selector: 'visitations',
    templateUrl: './visitations.component.html'
})
export class VisitationsComponent implements OnInit {

    imei: string;

    visitations: Array<Visitation>;
    visitedLocations: Array<Location>;

    constructor(private visitationsService: VisitationsService,
                private locationsService: LocationsService,
                private pageService: PageService) {
        this.imei = 'ooooo';
     }

    ngOnInit(): void {
        this.visitationsService.getAllVisitationsForImei(this.imei).subscribe(
            (data) => this.visitations = data,
            (error) => console.log(error)
        );

        this.visitedLocations = this.locationsService.getLocationsByIds(
            this.visitations.map(({locationId}) => locationId));
    }

    getLocation(id: number): Location {
        return this.visitedLocations.find((item) => item.id === id);
    }

    changePage(event: SwipeGestureEventData) {
        this.pageService.setPage(event, 3);
    }
}
