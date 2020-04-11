import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';
import { DeviceInformationService } from '../shared/deviceInformation.service';

@Component({
    selector: 'info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

    isInfected: boolean;

    constructor(private statusService: StatusService, private deviceInformationService: DeviceInformationService) {}

    ngOnInit(): void {
        this.statusService.getStatus(this.deviceInformationService.getDeviceImei()).subscribe(
            (data) => this.isInfected = data,
            (error) => console.error(error)
        );
    }
}
