import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NSEmptyOutletComponent } from 'nativescript-angular';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/(visitationsTab:visitations/default//mapTab:map/default//qrTab:qr/default//infoTab:info/default//statusTab:status/default//notificationsTab:notifications/default)',
        pathMatch: 'full'
    },

    {
        path: 'visitations',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/visitations/visitations.module').then((m) => m.VisitationsModule),
        outlet: 'visitationsTab'
    },
    {
        path: 'qr',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/qr/qr.module').then((m) => m.QrModule),
        outlet: 'qrTab'
    },
    {
        path: 'map',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/map/map.module').then((m) => m.MapModule),
        outlet: 'mapTab'
    },
    {
        path: 'info',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/info/info.module').then((m) => m.InfoModule),
        outlet: 'infoTab'
    },
    {
        path: 'status',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/status/status.module').then((m) => m.StatusModule),
        outlet: 'statusTab'
    },
    {
        path: 'notifications',
        component: NSEmptyOutletComponent,
        loadChildren: () => import('~/app/notifications/notifications.module').then((m) => m.NotificationsModule),
        outlet: 'notificationsTab'
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
