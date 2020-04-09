import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { BarcodeScanner } from 'nativescript-barcodescanner';

import { QrRoutingModule } from './qr-routing.module';
import { QrComponent } from './qr.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        QrRoutingModule
    ],
    declarations: [
        QrComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [BarcodeScanner]
})
export class QrModule { }
