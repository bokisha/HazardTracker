import { Component, OnInit } from '@angular/core';
import { Notification, NotificationsService } from '../shared/notifications.service';
import { PageService } from '../shared/page.service';
import { SwipeGestureEventData } from 'tns-core-modules/ui/gestures/gestures';
import { DeviceInformationService } from '../shared/deviceInformation.service';
import { StatusService } from '../shared/status.service';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {

    imei: string;
    isInfected: boolean;

    notifications: Array<Notification>;

    constructor(private notificationsService: NotificationsService,
                private pageService: PageService,
                private deviceInformationService: DeviceInformationService,
                private statusService: StatusService) {
        this.imei = this.deviceInformationService.getDeviceImei();
    }

    ngOnInit(): void {
        this.notificationsService.getAllNotificationsForUser(this.imei).subscribe(
            (data) => this.notifications = data,
            (error) => console.log(error)
        );
        this.statusService.getStatus(this.deviceInformationService.getDeviceImei()).subscribe(
            (data) => this.isInfected = data,
            (error) => console.error(error)
        );
    }

    changePage(event: SwipeGestureEventData) {
        this.pageService.setPage(event, 4);
    }
}
