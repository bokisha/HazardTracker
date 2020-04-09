import { Component, OnInit } from '@angular/core';
import { VisitorsService, Visitor } from '../shared/visitors.service';

@Component({
    selector: 'hazard-visitors-list',
    templateUrl: './visitors-list.component.html',
    styleUrls: ['./visitors-list.component.scss']
})
export class VisitorsListComponent implements OnInit {

    visitors: Array<Visitor>;

    constructor(private visitorsService: VisitorsService) { }

    ngOnInit() {
        this.visitorsService.getVisitors().subscribe(
            (data) => this.visitors = data,
            (error) => console.error(error)
        );
    }

}
