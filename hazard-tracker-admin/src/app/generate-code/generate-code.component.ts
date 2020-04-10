import { Component, OnInit } from '@angular/core';
import { Location } from '../shared/location';
import { LocationService } from '../shared/location.service';

@Component({
  selector: 'hazard-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.scss']
})
export class GenerateCodeComponent implements OnInit {

  constructor(private locationService: LocationService) { }

  ngOnInit() {}

  addLocation(newLocationName: string, newLocationAddress: string) {
    const location = new Location(newLocationName, newLocationAddress);

    this.locationService.addLocation(location).subscribe();
  }
}
