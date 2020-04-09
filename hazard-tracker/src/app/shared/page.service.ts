import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SwipeGestureEventData, SwipeDirection } from 'tns-core-modules/ui/gestures/gestures';

@Injectable({
    providedIn: 'root'
})
export class PageService {

    page = new Subject<number>();

    constructor() {
        this.page.next(0);
    }

    getPage(): Subject<number> {
        return this.page;
    }

    setPage(event: SwipeGestureEventData, currentPage: number) {
        if (event.direction === SwipeDirection.right) {
            this.page.next(currentPage - 1);
        } else if (event.direction === SwipeDirection.left) {
            this.page.next(currentPage + 1);
        }
    }
}
