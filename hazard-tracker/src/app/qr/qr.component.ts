import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'nativescript-barcodescanner';

@Component({
    selector: 'qr',
    templateUrl: './qr.component.html'
})
export class QrComponent implements OnInit {

    messageFromQrCode: string;
    constructor(private barcodeScanner: BarcodeScanner) {
        // Use the component constructor to inject providers.
    }

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
            closeCallback: () => { console.log('Scanner closed')}, // invoked when the scanner was closed (success or abort)
            resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
            openSettingsIfPermissionWasPreviouslyDenied: true, // On iOS you can send the user to the settings app if access was previously denied
            presentInRootViewController: true // iOS-only; If you're sure you're not presenting the (non embedded) scanner in a modal, or are experiencing issues with fi. the navigationbar, set this to 'true' and see if it works better for your app (default false).
          }).then((result) => {
              // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
              this.messageFromQrCode = result.text;
              alert({
                title: 'Scan result',
                message: 'Format: ' + result.format + ',\nValue: ' + result.text,
                okButtonText: 'OK'
              });
            }, (errorMessage) => {
                this.messageFromQrCode = errorMessage;
                console.log('No scan. ' + errorMessage);
            }
          );
    }
}
