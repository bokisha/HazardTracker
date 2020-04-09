import { Component, OnInit } from '@angular/core';

import { SwipeGestureEventData, SwipeDirection } from 'tns-core-modules/ui/gestures';
import { prompt, PromptResult, PromptOptions, inputType, capitalizationType, confirm } from 'tns-core-modules/ui/dialogs';

import { PageService } from './shared/page.service';
import { UsersService } from './shared/users.service';

@Component({
    selector: 'ns-app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

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
                private usersService: UsersService) { }

    ngOnInit(): void {
        this._selectedPage = 2;

        this.pageService.getPage().subscribe(
            (data) => this.selectedPage = data,
            (error) => console.error(error),
            () => console.log(this.selectedPage)
        );
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

                    this.usersService.postHazard('', +promptResult.text);
                });
            };

            showPrompt();
        });
    }
}
