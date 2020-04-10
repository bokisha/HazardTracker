import { Injectable } from '@angular/core';
import * as platformModule from 'tns-core-modules/platform';

@Injectable({
    providedIn: 'root'
})
export class DeviceInformationService {

    constructor() { }

    getDeviceImei(){
        return platformModule.device.uuid;
    }
}
