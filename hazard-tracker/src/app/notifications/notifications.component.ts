import { Component, OnInit } from '@angular/core';
import { Notification, NotificationsService } from '../shared/notifications.service';
import { PageService } from '../shared/page.service';
import { SwipeGestureEventData } from 'tns-core-modules/ui/gestures/gestures';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {

    imei: string;

    notifications: Array<Notification>;

    constructor(private notificationsService: NotificationsService,
        private pageService: PageService) {
        this.imei = 'ooooo';
    }

    ngOnInit(): void {
        this.notificationsService.getAllNotificationsForUser(this.imei).subscribe(
            (data) => this.notifications = data,
            (error) => console.log(error)
        );
    }

    changePage(event: SwipeGestureEventData) {
        this.pageService.setPage(event, 4);
    }
}
