import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { VisitationsRoutingModule } from './visitations-routing.module';
import { VisitationsComponent } from './visitations.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        VisitationsRoutingModule
    ],
    declarations: [
        VisitationsComponent,
        ItemDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class VisitationsModule { }
