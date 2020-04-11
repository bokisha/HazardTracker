import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';
import { DeviceInformationService } from '../shared/deviceInformation.service';

@Component({
    selector: 'status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
    isInfected: boolean;

    constructor(private statusService: StatusService, private imeiService: DeviceInformationService) {}

    ngOnInit(): void {
        this.statusService.getStatus(this.imeiService.getDeviceImei()).subscribe(
            (data) => this.isInfected = data,
            (error) => console.error(error)
        );
    }
}
