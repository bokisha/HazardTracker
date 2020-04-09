import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NotificationsRoutingModule
    ],
    declarations: [
        NotificationsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NotificationsModule { }
