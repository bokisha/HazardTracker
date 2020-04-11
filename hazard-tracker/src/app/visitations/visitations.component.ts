import { DeviceInformationService } from './../shared/deviceInformation.service';
import { Component, OnInit } from '@angular/core';

import { Location } from '../shared/locations.service';
import { VisitationsService, Visitation } from '../shared/visitations.service';
import { SwipeGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { PageService } from '../shared/page.service';
import { StatusService } from '../shared/status.service';

@Component({
    selector: 'visitations',
    templateUrl: './visitations.component.html'
})
export class VisitationsComponent implements OnInit {

    imei: string;
    isInfected: boolean;

    visitations: Array<Visitation> = new Array<Visitation>();
    visitedLocations: Array<Location> =  new Array<Location>();

    constructor(private visitationsService: VisitationsService,
                private pageService: PageService,
                private deviceInformationService: DeviceInformationService,
                private statusService: StatusService) {
        this.imei = this.deviceInformationService.getDeviceImei();
        this.statusService.getStatus(this.deviceInformationService.getDeviceImei()).subscribe(
            (data) => this.isInfected = data,
            (error) => console.error(error)
        );
    }

    ngOnInit(): void {
      this.loadData();
    }

    loadData() {
        this.visitationsService.getAllVisitationsForImei(this.imei).subscribe(
            (data) => this.visitations = data,
            (error) => console.log(error)
        );
    }

    getVisitedLocationName(visitation: Visitation) {
        if (visitation === undefined || visitation.location === null) {
            return '';
        }

        return visitation.location.name;
    }

    getVisitedLocationAddress(visitation: Visitation) {
        if (visitation === undefined || visitation.location === null) {
            return '';
        }

        return visitation.location.address;
    }

    changePage(event: SwipeGestureEventData) {
        this.pageService.setPage(event, 3);
    }
}
