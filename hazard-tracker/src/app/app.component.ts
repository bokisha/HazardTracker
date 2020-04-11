import { DeviceInformationService } from './shared/deviceInformation.service';
import { Component, OnInit } from '@angular/core';

import { SwipeGestureEventData, SwipeDirection } from 'tns-core-modules/ui/gestures';
import { alert, prompt, PromptResult, PromptOptions, inputType, capitalizationType, confirm } from 'tns-core-modules/ui/dialogs';
import { Message, messaging } from 'nativescript-plugin-firebase/messaging';
import { screen } from 'tns-core-modules/platform';

import { PageService } from './shared/page.service';
import { UsersService } from './shared/users.service';
import * as applicationSettings from 'tns-core-modules/application-settings';
import { StatusService } from './shared/status.service';

const firebase = require('nativescript-plugin-firebase');

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    screenHeight: number;
    screenWidth: number;
    imei: string;
    isInfected: boolean;

    private _selectedPage: number;

    get selectedPage(): number {
        return this._selectedPage;
    }

    set selectedPage(value: number) {
        if (value > 2) {
            this._selectedPage = 2;
        } else if (value < 0) {
            this._selectedPage = 0;
        } else {
            this._selectedPage = value;
        }

        console.log(this.selectedPage);
    }

    constructor(private pageService: PageService,
                private usersService: UsersService,
                private deviceInformationService: DeviceInformationService,
                private statusService: StatusService) { }

    ngOnInit(): void {

        this.statusService.getStatus(this.deviceInformationService.getDeviceImei()).subscribe(
            (data) => this.isInfected = data,
            (error) => console.error(error)
        );

        this.imei = this.deviceInformationService.getDeviceImei();
        console.log('IMEI: ' + this.imei);

        firebase.init({
        }).then(
            () => {
                console.log('firebase.init done');
            },
            (error) => {
                console.log(`firebase.init error: ${error}`);
            }
        );

        applicationSettings.setBoolean('APP_REGISTERED_FOR_NOTIFICATIONS', true);
        messaging.registerForPushNotifications({
            onPushTokenReceivedCallback: (token: string): void => {
                this.usersService.postToken(this.imei, token);
                console.log('messaging token ' + token);
            },

            onMessageReceivedCallback: (message: Message) => {
                console.log('Messaging message ' + message);

                setTimeout(() => {
                alert({
                  title: message.title,
                  message: (message !== undefined && message.body !== undefined ? message.body : ''),
                  okButtonText: 'Ok'
                });
              }, 500);
            },

            showNotifications: true,

            // Whether you want this plugin to always handle the notifications when the app is in foreground.
            // Currently used on iOS only. Default false.
            // When false, you can still force showing it when the app is in the foreground
            // by adding 'showWhenInForeground' to the notification as mentioned in the readme.
            showNotificationsWhenInForeground: false
          })
              .then(() => console.log('>>>> Registered for push'))
              .catch((err) => console.log('>>>> Failed to register for push'));

        this._selectedPage = 2;

        this.pageService.getPage().subscribe(
            (data) => this.selectedPage = data,
            (error) => console.error(error),
            () => console.log(this.selectedPage)
        );

        this.screenHeight = screen.mainScreen.heightDIPs;
        this.screenWidth = screen.mainScreen.widthDIPs;
    }

    swipe(event: SwipeGestureEventData) {
        // if (event.direction === SwipeDirection.right && this.selectedPage !== 0) {
        //     this.selectedPage--;
        // } else if (event.direction === SwipeDirection.left && this.selectedPage !== 2) {
        //     this.selectedPage++;
        // }
    }

    addHazard() {
        const options = {
            message: 'How are you feeling today?',
            okButtonText: 'Not so good',
            cancelButtonText: 'OK'
        };

        confirm(options).then((result: boolean) => {
            if (result === false) {
                return;
            }

            const showPrompt = () => {
                const promptOptions: PromptOptions = {
                    message: 'For how many days have you had the simptoms?',
                    okButtonText: 'Submit',
                    cancelButtonText: 'Cancel',
                    cancelable: true,
                    inputType: inputType.number
                };

                prompt(promptOptions).then((promptResult: PromptResult) => {
                    if (promptResult.result === false) {
                        return;
                    }

                    if (promptResult.text === '' || promptResult.text === undefined || +promptResult.text === 0) {
                        showPrompt();

                        return;
                    }

                    this.usersService.postHazard(this.imei, +promptResult.text);
                });
            };

            showPrompt();
        });
    }
}
