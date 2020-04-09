import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { StatusRoutingModule } from './status-routing.module';
import { StatusComponent } from './status.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        StatusRoutingModule
    ],
    declarations: [
        StatusComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class StatusModule { }
