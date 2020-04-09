import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { NotificationsComponent } from './notifications.component';

const routes: Routes = [
    { path: 'default', component: NotificationsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class NotificationsRoutingModule { }
