import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { PageService } from '../shared/page.service';
import { SwipeGestureEventData } from 'tns-core-modules/ui/gestures/gestures';

@Component({
    selector: 'qr',
    templateUrl: './qr.component.html',
    styleUrls: ['./qr.component.scss']
})
export class QrComponent implements OnInit {

    messageFromQrCode: string;

    constructor(private barcodeScanner: BarcodeScanner,
                private pageService: PageService) {}

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }

    onScan() {
        this.barcodeScanner.scan({
            formats: 'QR_CODE, EAN_13',
            cancelLabelBackgroundColor: '#333333', // iOS only, default '#000000' (black)
            preferFrontCamera: false,
            beepOnScan: true,
            fullScreen: true,
            // invoked when the scanner was closed (success or abort)
            closeCallback: () => console.log('Scanner closed'),
            // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
            resultDisplayDuration: 500,
            // On iOS you can send the user to the settings app if access was previously denied
            openSettingsIfPermissionWasPreviouslyDenied: true,
            // iOS-only; If you're sure you're not presenting the (non embedded) scanner in a modal,
            // or are experiencing issues with fi. the navigationbar,
            // set this to 'true' and see if it works better for your app (default false).
            presentInRootViewController: true
        }).then((result) => {
            // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
            this.messageFromQrCode = result.text;
            alert({
                title: 'Scan result',
                message: 'Format: ' + result.format + ',\nValue: ' + result.text,
                okButtonText: 'OK'
            });
        },
        (errorMessage) => {
            alert({
                title: 'Error while scanning',
                message: errorMessage + '\nPlease try again.',
                okButtonText: 'OK'
            });
        });
    }

    changePage(event: SwipeGestureEventData) {
        this.pageService.setPage(event, 2);
    }
}
