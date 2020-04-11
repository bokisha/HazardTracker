import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';
import { User } from '../shared/users.service';

@Component({
    selector: 'status',
    templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit {
    isInfected: boolean;

    constructor(private statusService: StatusService) {}

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    getStatus(imei: string) {
        this.statusService.getStatus(imei).subscribe(
            (data) => this.isInfected = data,
            (error) => console.error(error)
        );
    }
}
