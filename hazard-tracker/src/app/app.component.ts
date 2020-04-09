import { Component, OnInit } from '@angular/core';
import { SwipeGestureEventData, SwipeDirection } from 'tns-core-modules/ui/gestures';
import { PageService } from './shared/page.service';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    private _selectedPage: number;

    get selectedPage(): number {
        return this._selectedPage;
    }

    set selectedPage(value: number) {
        if (value > 2) {
            this._selectedPage = 2;
        } else if (value < 0) {
            this._selectedPage = 0;
        } else {
            this._selectedPage = value;
        }

        console.log(this.selectedPage);
    }

    constructor(private pageService: PageService) {
    }

    ngOnInit(): void {
        this._selectedPage = 2;

        this.pageService.getPage().subscribe(
            (data) => this.selectedPage = data,
            (error) => console.error(error),
            () => console.log(this.selectedPage)
        );
    }

    swipe(event: SwipeGestureEventData) {
        // if (event.direction === SwipeDirection.right && this.selectedPage !== 0) {
        //     this.selectedPage--;
        // } else if (event.direction === SwipeDirection.left && this.selectedPage !== 2) {
        //     this.selectedPage++;
        // }
    }
}
