import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';

@Component({
    selector: 'status',
    templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit {
    constructor(private statusService: StatusService) {}

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    getStatus(imei: string) {
        this.statusService.getStatus(imei); 
    }
}
