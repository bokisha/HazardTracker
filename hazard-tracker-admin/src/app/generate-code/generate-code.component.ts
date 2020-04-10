import { Location } from './../shared/location';
import { Component, OnInit } from '@angular/core';
import { LocationService } from '../shared/location.service';

@Component({
  selector: 'hazard-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.scss']
})
export class GenerateCodeComponent implements OnInit {
    location: Location = null;
    constructor(private locationService: LocationService) { }

    ngOnInit() {}

    addLocation(newLocationName: string, newLocationAddress: string) {
        this.location = new Location(newLocationName, newLocationAddress);
        this.locationService.addLocation(this.location).subscribe(
            {
                next: this.saveSuccessHelper.bind(this)
            }
        );
    }
    generatePdf() {
        // this.location = new Location("test", "test");
        this.locationService.generatePdf(this.location).subscribe(
            {
                next: this.generateSuccessHelper.bind(this)
            }
        );
    }

    private saveSuccessHelper(response: Location) {
        this.location = response;
    }

    private generateSuccessHelper(response: any) {
        const blob = new Blob([response], {type: 'application/pdf'});

        const  downloadURL = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = "QRCode.pdf";
        link.click();
    }
}
