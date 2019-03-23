import { NgModule } from '@angular/core';

import { InterpreterNotifsComponent } from './notifs.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [],
    declarations: [InterpreterNotifsComponent],
    entryComponents: [InterpreterNotifsComponent],
    providers: [],
})
export class InterpreterNotifModule { }
